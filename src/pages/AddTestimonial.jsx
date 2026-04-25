import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

function AddTestimonial() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    organization: "",
    message: "",
    approved: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `testimonials/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let image_url = "";

      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }

      const { error } = await supabase.from("testimonials").insert({
        name: form.name,
        role: form.role,
        organization: form.organization,
        message: form.message,
        approved: form.approved,
        image_url,
      });

      if (error) throw error;

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to save testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
              Admin
            </p>
            <h1 className="text-3xl font-bold">Add Testimonial</h1>
          </div>

          <Link
            to="/admin/dashboard"
            className="text-sm text-cyan-400 transition hover:underline"
          >
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
            required
          />

          <input
            name="role"
            placeholder="Role / Title"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
          />

          <input
            name="organization"
            placeholder="Organization / School / Company"
            value={form.organization}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
          />

          <textarea
            name="message"
            placeholder="Testimonial message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
            required
          />

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              name="approved"
              checked={form.approved}
              onChange={handleChange}
            />
            Approved
          </label>

          {message && <p className="text-sm text-red-400">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.01]"
          >
            {loading ? "Saving..." : "Save Testimonial"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddTestimonial;