import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../services/projectService";

function Projects() {
  const [softwareProjects, setSoftwareProjects] = useState([]);
  const [eeeProjects, setEEEProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();

      const featuredProjects = data.filter((project) => project.featured);

      const software = featuredProjects.filter(
        (project) => project.category === "software"
      );

      const eee = featuredProjects.filter(
        (project) => project.category === "eee"
      );

      setSoftwareProjects(software);
      setEEEProjects(eee);
    }

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="px-6 py-20 lg:px-10">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
          Featured Projects
        </p>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-[var(--text-color)] sm:text-4xl">
            Selected work across software and engineering.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted-text)]">
            A few projects I’ve chosen to highlight on the homepage.
          </p>
        </motion.div>

        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="mb-6 text-2xl font-semibold text-[var(--text-color)]">
              Software Development
            </h3>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {softwareProjects.length > 0 ? (
                softwareProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    delay={index * 0.12}
                  />
                ))
              ) : (
                <p className="text-sm text-[var(--muted-text)]">
                  No featured software projects yet.
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="mb-6 text-2xl font-semibold text-[var(--text-color)]">
              Graphics and Designs
            </h3>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {eeeProjects.length > 0 ? (
                eeeProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    delay={index * 0.12}
                  />
                ))
              ) : (
                <p className="text-sm text-[var(--muted-text)]">
                  No featured EEE projects yet.
                </p>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Link
            to="/projects"
            className="rounded-full border border-cyan-400/30 px-6 py-3 font-semibold text-cyan-500 transition hover:bg-cyan-400/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]"
          >
            View All Projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Projects;