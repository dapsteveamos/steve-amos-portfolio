import { motion } from "framer-motion";

function Contact() {
  return (
    <section id="contact" className="px-6 py-20 lg:px-10">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 backdrop-blur-xl lg:p-12">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
            Contact
          </p>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              <h2 className="max-w-2xl text-3xl font-bold leading-tight text-[var(--text-color)] sm:text-4xl">
                Let’s connect and build something meaningful.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted-text)]">
                I’m open to opportunities, collaborations, and projects where I
                can keep growing while building useful software. If you’d like
                to work with me or reach out, feel free to send a message.
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, delay: 0.2 }}
            >
              <motion.a
                whileHover={{ y: -4, scale: 1.01 }}
                href="mailto:dapsteveamos@gmail.com"
                className="block rounded-2xl border border-[var(--card-border)] bg-[var(--surface-color)] p-5 transition hover:border-cyan-400/40"
              >
                <p className="text-sm text-[var(--muted-text)]">Email</p>
                <p className="mt-1 text-base font-medium text-[var(--text-color)]">
                  dapsteveamos@gmail.com
                </p>
              </motion.a>

              <motion.a
                whileHover={{ y: -4, scale: 1.01 }}
                href="https://github.com/dapsteveamos"
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-[var(--card-border)] bg-[var(--surface-color)] p-5 transition hover:border-cyan-400/40"
              >
                <p className="text-sm text-[var(--muted-text)]">GitHub</p>
                <p className="mt-1 text-base font-medium text-[var(--text-color)]">
                  github.com/dapsteveamos
                </p>
              </motion.a>

              <motion.a
                whileHover={{ y: -4, scale: 1.01 }}
                href="https://www.linkedin.com/in/steve-amos-ab910b282/"
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-[var(--card-border)] bg-[var(--surface-color)] p-5 transition hover:border-cyan-400/40"
              >
                <p className="text-sm text-[var(--muted-text)]">LinkedIn</p>
                <p className="mt-1 text-base font-medium text-[var(--text-color)]">
                  linkedin.com/in/steve-amos-ab910b282/
                </p>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;