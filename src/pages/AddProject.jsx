import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

function AddProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "software",
    description: "",
    problem: "",
    role: "",
    result: "",
    stack: "",
    github_url: "",
    live_url: "",
    featured: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadSingleImage = async (file, folder = "projects") => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random()
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
      let gallery_urls = [];

      if (imageFile) {
        image_url = await uploadSingleImage(imageFile, "projects");
      }

      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          const url = await uploadSingleImage(file, "projects/gallery");
          gallery_urls.push(url);
        }
      }

      const { error } = await supabase.from("projects").insert({
        title: form.title,
        category: form.category,
        description: form.description,
        problem: form.problem,
        role: form.role,
        result: form.result,
        stack: form.stack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        github_url: form.github_url,
        live_url: form.live_url,
        featured: form.featured,
        image_url,
        gallery_urls,
      });

      if (error) throw error;

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to save project.");
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
            <h1 className="text-3xl font-bold">Add Project</h1>
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
            name="title"
            placeholder="Project title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
          >
            <option value="software">Software</option>
            <option value="eee">EEE</option>
          </select>

          <textarea
            name="description"
            placeholder="Short project description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
            required
          />

          <textarea
            name="problem"
            placeholder="Problem this project solves"
            value={form.problem}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
          />

          <textarea
            name="role"
            placeholder="Your role in this project"
            value={form.role}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
          />

          <textarea
            name="result"
            placeholder="Result or outcome of this project"
            value={form.result}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
          />

          <input
            name="stack"
            placeholder="Stack (comma separated)"
            value={form.stack}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
          />

          <input
            name="github_url"
            placeholder="GitHub URL"
            value={form.github_url}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
          />

          <input
            name="live_url"
            placeholder="Live demo URL"
            value={form.live_url}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
          />

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Project Screenshots
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))}
              className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
            />
          </div>

          {galleryFiles.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {galleryFiles.map((file, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-[#0b1220] p-3 text-xs text-gray-300"
                >
                  {file.name}
                </div>
              ))}
            </div>
          )}

          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Feature this project
          </label>

          {message && <p className="text-sm text-red-400">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.01]"
          >
            {loading ? "Saving..." : "Save Project"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddProject;