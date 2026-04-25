import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetails from "./pages/ProjectDetails";
import AddTestimonial from "./pages/AddTestimonial";
import SubmitReview from "./pages/SubmitReview";
import ManageTestimonials from "./pages/ManageTestimonials";

// admin pages
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";

// helpers
import ProtectedRoute from "./components/ProtectedRoute";
import { supabase } from "./lib/supabase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/review" element={<SubmitReview />} />

      {/* ADMIN ROUTES */}
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute user={user}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-project"
        element={
          <ProtectedRoute user={user}>
            <AddProject />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-project/:id"
        element={
          <ProtectedRoute user={user}>
            <EditProject />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-testimonial"
        element={
          <ProtectedRoute user={user}>
            <AddTestimonial />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/testimonials"
        element={
          <ProtectedRoute user={user}>
            <ManageTestimonials />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;