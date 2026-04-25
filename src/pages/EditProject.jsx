import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProjectById, updateProject } from "../services/projectService";

function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [oldImagePath, setOldImagePath] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [existingGalleryUrls, setExistingGalleryUrls] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getStoragePathFromPublicUrl = (url) => {
    try {
      const parsed = new URL(url);
      const marker = "/object/public/project-images/";
      const parts = parsed.pathname.split(marker);
      return parts[1] || "";
    } catch {
      return "";
    }
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

  useEffect(() => {
    async function loadProject() {
      const project = await getProjectById(id);

      if (!project) {
        setMessage("Project not found.");
        setLoading(false);
        return;
      }

      setForm({
        title: project.title || "",
        category: project.category || "software",
        description: project.description || "",
        problem: project.problem || "",
        role: project.role || "",
        result: project.result || "",
        stack: project.stack?.join(", ") || "",
        github_url: project.github_url || "",
        live_url: project.live_url || "",
        featured: !!project.featured,
      });

      setExistingImageUrl(project.image_url || "");
      setExistingGalleryUrls(project.gallery_urls || []);

      if (project.image_url) {
        setOldImagePath(getStoragePathFromPublicUrl(project.image_url));
      }

      setLoading(false);
    }

    loadProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRemoveExistingGalleryImage = (urlToRemove) => {
    setExistingGalleryUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      let image_url = existingImageUrl;
      let gallery_urls = [...existingGalleryUrls];

      if (imageFile) {
        const newImageUrl = await uploadSingleImage(imageFile, "projects");
        image_url = newImageUrl;

        if (oldImagePath) {
          await supabase.storage.from("project-images").remove([oldImagePath]);
        }
      }

      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          const url = await uploadSingleImage(file, "projects/gallery");
          gallery_urls.push(url);
        }
      }

      await updateProject(id, {
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

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to update project.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030712] px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
              Admin
            </p>
            <h1 className="text-3xl font-bold">Edit Project</h1>
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

          {existingImageUrl && (
            <img
              src={existingImageUrl}
              alt="Current project"
              className="h-48 w-full rounded-2xl object-cover"
            />
          )}

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Replace Cover Image
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
              Add More Project Screenshots
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))}
              className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 outline-none"
            />
          </div>

          {existingGalleryUrls.length > 0 && (
            <div>
              <p className="mb-3 text-sm text-gray-300">Current Gallery</p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {existingGalleryUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Project screenshot ${index + 1}`}
                      className="h-32 w-full rounded-2xl object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingGalleryImage(url)}
                      className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
            className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.01]"
          >
            Update Project
          </button>
        </form>
      </div>
    </main>
  );
}

export default EditProject;