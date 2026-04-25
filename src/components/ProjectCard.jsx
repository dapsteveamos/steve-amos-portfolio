import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProjectCard({ project, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl transition hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
    >
      {project.image_url && (
        <Link
          to={`/projects/${project.id}`}
          className="mb-4 block overflow-hidden rounded-2xl border border-[var(--card-border)]"
        >
          <img
            src={project.image_url}
            alt={project.title}
            className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>
      )}

      <Link to={`/projects/${project.id}`} className="block">
        <h3 className="text-xl font-semibold text-[var(--text-color)] transition group-hover:text-cyan-400">
          {project.title}
        </h3>
      </Link>

      <p className="mt-4 text-sm leading-7 text-[var(--muted-text)]">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack?.map((item, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.05 }}
            className="rounded-full border border-[var(--card-border)] bg-[var(--surface-color)] px-3 py-1 text-xs text-[var(--muted-text)]"
          >
            {item}
          </motion.span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to={`/projects/${project.id}`}
          className="rounded-full border border-cyan-400/30 px-4 py-2 text-sm font-medium text-cyan-500 transition hover:bg-cyan-400/10"
        >
          View Details
        </Link>

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
            className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Live Demo
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default ProjectCard;