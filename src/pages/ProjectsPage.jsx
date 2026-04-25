import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StarsBackground from "../components/StarsBackground";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../services/projectService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    }

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeFilter === "all" || project.category === activeFilter;

      const query = searchTerm.toLowerCase().trim();

      const matchesSearch =
        query === "" ||
        project.title?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.stack?.some((item) => item.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, searchTerm, activeFilter]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)]">
      <StarsBackground />
      <Navbar />

      <section className="px-6 py-20 lg:px-10">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link
            to="/"
            className="mb-6 inline-block text-sm text-cyan-400 transition hover:underline"
          >
            ← Back to Home
          </Link>

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
            All Projects
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            A deeper look at my work across software and engineering.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted-text)]">
            Browse through my software and EEE projects, explore the tools used,
            and see the direction I’m building in.
          </p>

          <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
            <input
              type="text"
              placeholder="Search by project title, description, or stack..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--surface-color)] px-4 py-3 text-sm text-[var(--text-color)] outline-none lg:max-w-xl"
            />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveFilter("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === "all"
                  ? "bg-cyan-400 text-black"
                  : "border border-[var(--card-border)] text-[var(--text-color)] hover:border-cyan-400 hover:text-cyan-400"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveFilter("software")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === "software"
                  ? "bg-cyan-400 text-black"
                  : "border border-[var(--card-border)] text-[var(--text-color)] hover:border-cyan-400 hover:text-cyan-400"
              }`}
            >
              Software
            </button>

            <button
              onClick={() => setActiveFilter("eee")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === "eee"
                  ? "bg-cyan-400 text-black"
                  : "border border-[var(--card-border)] text-[var(--text-color)] hover:border-cyan-400 hover:text-cyan-400"
              }`}
            >
              EEE
            </button>
          </div>
          </div>

          <div className="mt-10">
            {filteredProjects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    delay={index * 0.08}
                  />
                ))}
              </div>
            ) : (
            <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-10 text-center backdrop-blur-xl">
              <p className="text-lg font-medium text-[var(--text-color)]">
                  No projects matched your search.
                </p>
                <p className="mt-2 text-sm text-[var(--muted-text)]">
                  Try a different keyword or switch the category filter.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

export default ProjectsPage;