import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="px-6 py-20 lg:px-10">
      <motion.div
        className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
            About Me
          </p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            I’m building my path in software with a focus on real world systems.
          </h2>
        </motion.div>

        <motion.div
          className="space-y-5 text-base leading-8 text-gray-300 "
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-[var(--bg-color)] text-[var(--text-color)]">
          <p>
              I’m Steve Amos, CEO Steamo Technologies, A company offering full IT solution involving web developer,
              Graphics designer, UI/UX and Video Editor. My interest in software comes
              from when i build my first robot at Junior School which
              earn me my first $150 from parent at P.T.A, from then my desire increased to learn more and offer tech solutions.
          </p>

          <p>
            Right now, I’m focused on web development and modern frontend tools,
            but I’m also working towards areas like IoT, embedded systems, and
            smart automation, where software connects with hardware to solve
            practical problems.
          </p>

          <p>
            I enjoy building projects that are clear, functional, and useful,
            while steadily developing the skills needed to work on more advanced
            systems in the future.
          </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;