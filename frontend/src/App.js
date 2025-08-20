import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import UserForm from "./pages/UserForm";
import Assessment from "./pages/Assessment";
import Disclaimer from "./pages/Disclaimer";
import Evaluation from "./pages/Evaluation";
import DownloadReport from "./pages/DownloadReport"; // ✅ New import
import ThankYou from "./pages/Thankyou";
import Sidebar from "./components/Sidebar";

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Show sidebar only on evaluation page
  const showSidebar = location.pathname === "/evaluation";

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-[#0a0e1a] text-white min-h-screen">
      {showSidebar && <Sidebar />}
      <div
        className={`flex-1 transition-all duration-300 ${
          showSidebar ? (sidebarOpen ? "ml-64" : "ml-16") : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

// Protect /disclaimer route
const ProtectedDisclaimer = ({ children }) => {
  const formCompleted = localStorage.getItem("formCompleted") === "true";

  if (!formCompleted) {
    // Redirect to home if form not completed
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Start with UserDetailsForm */}
          <Route path="/" element={<UserForm />} />
          <Route
            path="/disclaimer"
            element={
              <ProtectedDisclaimer>
                <Disclaimer />
              </ProtectedDisclaimer>
            }
          />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/download-report" element={<DownloadReport />} /> {/* ✅ New route */}
          <Route path="/thankyou" element={<ThankYou />} />
          {/* If route not found, redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
