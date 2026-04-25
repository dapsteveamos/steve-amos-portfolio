import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../services/projectService";

function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Delete "${project.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      if (project.image_url) {
        const url = new URL(project.image_url);
        const pathParts = url.pathname.split("/object/public/project-images/");
        const filePath = pathParts[1];

        if (filePath) {
          await supabase.storage.from("project-images").remove([filePath]);
        }
      }

      if (project.gallery_urls && project.gallery_urls.length > 0) {
        const galleryPaths = project.gallery_urls
          .map((url) => {
            try {
              const parsed = new URL(url);
              const parts = parsed.pathname.split(
                "/object/public/project-images/"
              );
              return parts[1] || null;
            } catch {
              return null;
            }
          })
          .filter(Boolean);

        if (galleryPaths.length > 0) {
          await supabase.storage.from("project-images").remove(galleryPaths);
        }
      }

      await deleteProject(project.id);

      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
      alert("Failed to delete project.");
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-400">
              Admin Dashboard
            </p>
            <h1 className="text-3xl font-bold">Manage Portfolio Content</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/add-project"
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-black"
            >
              Add Project
            </Link>

            <Link
              to="/admin/add-testimonial"
              className="rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/10"
            >
              Add Testimonial
            </Link>

            <Link
              to="/admin/testimonials"
              className="rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Manage Testimonials
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="space-y-6">
            <p className="text-gray-400">No projects yet.</p>

            <div className="grid gap-6 md:grid-cols-2">
              <Link
                to="/admin/add-project"
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-400/30"
              >
                <h2 className="text-xl font-semibold">Add Project</h2>
                <p className="mt-2 text-gray-300">
                  Create a new software or EEE project and publish it to your
                  portfolio.
                </p>
              </Link>

              <Link
                to="/admin/add-testimonial"
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-400/30"
              >
                <h2 className="text-xl font-semibold">Add Testimonial</h2>
                <p className="mt-2 text-gray-300">
                  Add a testimonial to display in the homepage testimonial
                  section.
                </p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-gray-300">
              <p>Project</p>
              <p>Category</p>
              <p>Featured</p>
              <p>Actions</p>
            </div>

            {projects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 border-b border-white/10 px-6 py-4 text-sm"
              >
                <div>
                  <p className="font-medium text-white">{project.title}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {project.description?.slice(0, 70)}...
                  </p>
                </div>

                <p className="capitalize text-gray-300">{project.category}</p>

                <p className="text-gray-300">
                  {project.featured ? "Yes" : "No"}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/admin/edit-project/${project.id}`}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-white transition hover:border-cyan-400 hover:text-cyan-400"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(project)}
                    className="rounded-full border border-red-400/30 px-3 py-1 text-xs text-red-300 transition hover:bg-red-400/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminDashboard;