import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { getAuthToken } from "@/lib/api";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
