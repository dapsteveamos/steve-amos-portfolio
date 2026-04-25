import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getApprovedTestimonials } from "../services/testimonialService";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const data = await getApprovedTestimonials();
      setTestimonials(data);
    }

    fetchTestimonials();
  }, []);

  return (
    <section className="px-6 py-20 lg:px-10">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
          Testimonials
        </p>

        <div className="mb-12">
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-[var(--text-color)] sm:text-4xl">
            What clients and collaborators say
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted-text)]">
            Real feedback from people I have worked with.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.length > 0 ? (
            testimonials.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl"
              >
                <p className="text-sm leading-7 text-[var(--muted-text)]">
                  “{item.message}”
                </p>

                <div className="mt-6 flex items-center gap-4">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-600">
                      {item.name?.charAt(0)}
                    </div>
                  )}

                  <div>
                    <p className="font-medium text-[var(--text-color)]">
                      {item.name}
                    </p>
                    <p className="text-sm text-[var(--muted-text)]">
                      {[item.role, item.organization].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <p className="text-sm text-[var(--muted-text)]">
              Testimonials will appear here once added.
            </p>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/review"
            className="rounded-full border border-cyan-400/30 px-6 py-3 font-semibold text-cyan-500 transition hover:bg-cyan-400/10"
          >
            Add Review
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default Testimonials;