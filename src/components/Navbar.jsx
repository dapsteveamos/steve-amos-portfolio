import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useTheme from "../hooks/useTheme";
import BrandLogo from "./BrandLogo";

const navLinks = [
  { label: "Home", homeHref: "#", otherHref: "/" },
  { label: "About", homeHref: "#about", otherHref: "/#about" },
  { label: "Projects", homeHref: "#projects", otherHref: "/#projects" },
  { label: "Contact", homeHref: "#contact", otherHref: "/#contact" },
];

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--card-border)] bg-[var(--bg-color)]/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <BrandLogo />

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="hidden gap-8 text-sm font-medium md:flex"
        >
          {navLinks.map((item) => (
            <motion.li
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {isHomePage ? (
                <a
                  href={item.homeHref}
                  className="text-[var(--text-color)] transition hover:text-cyan-400"
                >
                  {item.label}
                </a>
              ) : item.label === "Home" ? (
                <Link
                  to="/"
                  className="text-[var(--text-color)] transition hover:text-cyan-400"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.otherHref}
                  className="text-[var(--text-color)] transition hover:text-cyan-400"
                >
                  {item.label}
                </a>
              )}
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--text-color)] transition hover:border-cyan-400 hover:text-cyan-400"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          {isHomePage ? (
            <a
              href="#contact"
              className="hidden rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/10 md:inline-flex"
            >
              Let’s Talk
            </a>
          ) : (
            <a
              href="/#contact"
              className="hidden rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/10 md:inline-flex"
            >
              Let’s Talk
            </a>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] text-[var(--text-color)] md:hidden"
          >
            <span className="text-lg">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25 }}
            className="border-t border-[var(--card-border)] bg-[var(--bg-color)]/95 px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item, index) =>
                isHomePage ? (
                  <motion.a
                    key={item.label}
                    href={item.homeHref}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-sm font-medium text-[var(--text-color)] transition hover:text-cyan-400"
                  >
                    {item.label}
                  </motion.a>
                ) : item.label === "Home" ? (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to="/"
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-medium text-[var(--text-color)] transition hover:text-cyan-400"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={item.label}
                    href={item.otherHref}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-sm font-medium text-[var(--text-color)] transition hover:text-cyan-400"
                  >
                    {item.label}
                  </motion.a>
                )
              )}

              <button
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
                }}
                className="rounded-full border border-[var(--card-border)] px-4 py-2 text-center text-sm font-medium text-[var(--text-color)] transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Switch to {theme === "dark" ? "Light" : "Dark"} Mode
              </button>

              {isHomePage ? (
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 rounded-full border border-cyan-400/40 px-4 py-2 text-center text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/10"
                >
                  Let’s Talk
                </a>
              ) : (
                <a
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 rounded-full border border-cyan-400/40 px-4 py-2 text-center text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/10"
                >
                  Let’s Talk
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;