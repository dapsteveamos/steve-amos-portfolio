import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
} from "../services/testimonialService";

function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadTestimonials() {
      try {
        const data = await getTestimonials();

        if (isMounted) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleApproveToggle = async (testimonial) => {
    try {
      await updateTestimonial(testimonial.id, {
        approved: !testimonial.approved,
      });

      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error(error);
      alert("Failed to update testimonial.");
    }
  };

  const handleDelete = async (testimonial) => {
    const confirmed = window.confirm(
      `Delete testimonial from "${testimonial.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteTestimonial(testimonial.id);

      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error(error);
      alert("Failed to delete testimonial.");
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] px-6 py-24 text-white lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-400">
              Admin
            </p>
            <h1 className="text-3xl font-bold">Manage Testimonials</h1>
          </div>

          <Link
            to="/admin/dashboard"
            className="text-sm text-cyan-400 transition hover:underline"
          >
            ← Back
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-gray-400">No testimonials submitted yet.</p>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="grid grid-cols-[1.2fr_2fr_0.8fr_1fr] gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-gray-300">
              <p>Name</p>
              <p>Message</p>
              <p>Status</p>
              <p>Actions</p>
            </div>

            {testimonials.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1.2fr_2fr_0.8fr_1fr] gap-4 border-b border-white/10 px-6 py-4 text-sm"
              >
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {[item.role, item.organization].filter(Boolean).join(", ")}
                  </p>
                </div>

                <p className="text-gray-300">
                  {item.message?.slice(0, 90)}...
                </p>

                <p
                  className={`font-medium ${
                    item.approved ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {item.approved ? "Approved" : "Pending"}
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleApproveToggle(item)}
                    className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs text-cyan-300 transition hover:bg-cyan-400/10"
                  >
                    {item.approved ? "Unapprove" : "Approve"}
                  </button>

                  <button
                    onClick={() => handleDelete(item)}
                    className="rounded-full border border-red-400/30 px-3 py-1 text-xs text-red-300 transition hover:bg-red-400/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ManageTestimonials;