import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StarsBackground from "../components/StarsBackground";
import { getProjectById } from "../services/projectService";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      const data = await getProjectById(id);
      setProject(data);
      setLoading(false);
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)]">
        <p className="text-sm text-[var(--muted-text)]">Loading project...</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
        <Navbar />
        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/projects"
              className="mb-6 inline-block text-sm text-cyan-400 transition hover:underline"
            >
              ← Back to Projects
            </Link>

            <h1 className="text-3xl font-bold text-[var(--text-color)]">
              Project not found
            </h1>
            <p className="mt-4 text-[var(--muted-text)]">
              The project you are looking for does not exist or may have been removed.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-color)] pt-24 text-[var(--text-color)]">
      <StarsBackground />
      <Navbar />

      <section className="px-6 py-16 lg:px-10">
        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link
            to="/projects"
            className="mb-6 inline-block text-sm text-cyan-400 transition hover:underline"
          >
            ← Back to Projects
          </Link>

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
            {project.category === "software"
              ? "Software Project"
              : "Graphics and Designs"}
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[var(--text-color)] sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted-text)] sm:text-lg">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.stack?.map((item, index) => (
              <span
                key={index}
                className="rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--muted-text)]"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              {project.image_url ? (
                <div className="overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)]">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full cursor-pointer object-cover"
                    onClick={() => setSelectedImage(project.image_url)}
                  />
                </div>
              ) : (
                <div className="flex h-72 items-center justify-center rounded-3xl border border-dashed border-[var(--card-border)] bg-[var(--card-bg)] text-sm text-[var(--muted-text)]">
                  No image available for this project yet.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-[var(--text-color)]">
                Project Info
              </h2>

              <div className="mt-6 space-y-5 text-sm text-[var(--muted-text)]">
                <div>
                  <p className="text-[var(--muted-text)]">Category</p>
                  <p className="mt-1 capitalize text-[var(--text-color)]">
                    {project.category}
                  </p>
                </div>

                <div>
                  <p className="text-[var(--muted-text)]">Featured</p>
                  <p className="mt-1 text-[var(--text-color)]">
                    {project.featured ? "Yes" : "No"}
                  </p>
                </div>

                <div>
                  <p className="text-[var(--muted-text)]">Created</p>
                  <p className="mt-1 text-[var(--text-color)]">
                    {project.created_at
                      ? new Date(project.created_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm font-medium text-[var(--text-color)] transition hover:border-cyan-400 hover:text-cyan-400"
                  >
                    GitHub
                  </a>
                )}

                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition hover:scale-105"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6">
            {project.problem && (
              <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-[var(--text-color)]">
                  Problem
                </h2>
                <p className="mt-4 leading-8 text-[var(--muted-text)]">
                  {project.problem}
                </p>
              </div>
            )}

            {project.role && (
              <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-[var(--text-color)]">
                  My Role
                </h2>
                <p className="mt-4 leading-8 text-[var(--muted-text)]">
                  {project.role}
                </p>
              </div>
            )}

            {project.result && (
              <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-[var(--text-color)]">
                  Result
                </h2>
                <p className="mt-4 leading-8 text-[var(--muted-text)]">
                  {project.result}
                </p>
              </div>
            )}
          </div>

          {project.gallery_urls && project.gallery_urls.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-semibold text-[var(--text-color)]">
                Project Gallery
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery_urls.map((url, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)]"
                  >
                    <img
                      src={url}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="h-64 w-full cursor-pointer object-cover transition duration-300 hover:scale-105"
                      onClick={() => setSelectedImage(url)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-2xl border border-[var(--card-border)] object-contain"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default ProjectDetails;