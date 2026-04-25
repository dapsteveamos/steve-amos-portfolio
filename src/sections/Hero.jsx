import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";

function Hero() {
  const { theme } = useTheme();
  const profileImage = theme === "dark" ? "/profile-dark.png" : "/profile.png";

  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-10 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute right-10 top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
            Software Engineer
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[var(--text-color)] sm:text-5xl lg:text-6xl">
            Building software for the web, smart systems, and real world use.
          </h1>

          <p className="mt-6 max-w-2xl rounded-lg bg-[var(--bg-color)] p-4 text-base leading-7 text-[var(--muted-text)] sm:text-lg">
            I’m Steve Amos, CEO Steamo Technologies, A company offering full IT solution involving web developer,
            Graphics designer, UI/UX and Video Editor. My interest in software comes
            from when i build my first robot at Junior School which
            earn me my first $150 from parent at P.T.A, from then my desire increased to learn more and offer tech solutions.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
            >
              View Projects
            </a>

            <a
              href="/STEVE-AMOS-CV.pdf"
              download
              className="rounded-full border border-[var(--card-border)] px-6 py-3 font-semibold text-[var(--text-color)] transition duration-300 hover:border-cyan-400 hover:text-cyan-400"
            >
              Download CV
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[320px] lg:max-w-[360px]"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-cyan-400/10 blur-2xl"></div>

          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--card-border)] bg-[var(--card-bg)] p-3 shadow-2xl backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--card-border)] bg-[var(--surface-color)]">
              <img
                src={profileImage}
                alt="Steve Amos"
                className="h-[380px] w-full object-cover lg:h-[430px]"
              />
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-5 left-5 rounded-2xl border border-cyan-400/20 bg-[var(--surface-color)]/90 px-4 py-3 backdrop-blur-md"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                Focus
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--text-color)]">
                Web • IoT • Embedded Systems
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;