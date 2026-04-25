import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

function SubmitReview() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    organization: "",
    message: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
    setStatus("");

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
        image_url,
        approved: false,
      });

      if (error) throw error;

      setStatus("Review submitted successfully. Redirecting...");

      setForm({
        name: "",
        role: "",
        organization: "",
        message: "",
      });
      setImageFile(null);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-color)] px-6 py-24 text-[var(--text-color)] lg:px-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 backdrop-blur-xl">
        <Link
          to="/"
          className="mb-6 inline-block text-sm text-cyan-400 transition hover:underline"
        >
          ← Back to Home
        </Link>

        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
          Review
        </p>

        <h1 className="mb-6 text-3xl font-bold text-[var(--text-color)]">
          Leave a Review
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--surface-color)] px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--muted-text)]"
          />

          <input
            type="text"
            name="role"
            placeholder="Your role / title"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--surface-color)] px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--muted-text)]"
          />

          <input
            type="text"
            name="organization"
            placeholder="Organization / company"
            value={form.organization}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--surface-color)] px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--muted-text)]"
          />

          <textarea
            name="message"
            placeholder="Write your review"
            value={form.message}
            onChange={handleChange}
            rows="5"
            required
            className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--surface-color)] px-4 py-3 text-[var(--text-color)] outline-none placeholder:text-[var(--muted-text)]"
          />

          <div>
            <label className="mb-2 block text-sm text-[var(--muted-text)]">
              Add Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--surface-color)] px-4 py-3 text-[var(--text-color)] outline-none file:mr-4 file:rounded-full file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
            />
          </div>

          {status && <p className="text-sm text-cyan-500">{status}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.01]"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default SubmitReview;