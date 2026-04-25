import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    title: "Software Tools",
    items: ["Git", "GitHub", "VS Code", "Vite", "Figma"],
  },
  {
    title: "Backend / Data",
    items: ["Node.js", "Express", "JSON", "Supabase"],
  },
  {
    title: "Emerging Focus",
    items: ["IoT", "Embedded Systems", "Smart Systems", "Automation"],
  },
];

function Skills() {
  return (
    <section id="skills" className="px-6 py-20 lg:px-10 ">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
          Skills
        </p>

        <motion.div
          className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            Tools and skills I use to build solid digital products.
          </h2>

          <p className="bg-[var(--bg-color)] text-[var(--text-color)]">
            I’m growing by building real projects and developing the skills that
            support both software development and smart systems.
          </p>
        </motion.div>

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  {skillGroups.map((group, index) => (
    <motion.div
      key={group.title}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl"
    >
      <h3 className="mb-5 text-lg font-semibold text-[var(--text-color)]">
        {group.title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {group.items.map((item) => (
          <motion.span
            key={item}
            whileHover={{ scale: 1.05 }}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-700"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  ))}
</div>
      </motion.div>
    </section>
  );
}

export default Skills;