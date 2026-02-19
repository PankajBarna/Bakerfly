import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import MobileCtaBar from "./components/layout/MobileCtaBar.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Pricing from "./pages/Pricing.jsx";
import Contact from "./pages/Contact.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Settings from "./pages/admin/Settings.jsx";
import Categories from "./pages/admin/Categories.jsx";
import Items from "./pages/admin/Items.jsx";
import Leads from "./pages/admin/Leads.jsx";
import Analytics from "./pages/admin/Analytics.jsx";
import ProtectedRoute from "./router/ProtectedRoute.jsx";
import { trackPageView } from "./lib/track.js";

export default function App() {
  const loc = useLocation();

  useEffect(() => {
    trackPageView(loc.pathname);
  }, [loc.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="categories" element={<Categories />} />
            <Route path="items" element={<Items />} />
            <Route path="leads" element={<Leads />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
