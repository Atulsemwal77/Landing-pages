import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiMenu, FiLogOut, FiFileText, FiUsers } from "react-icons/fi";
import axios from "axios";

const SidebarLink = ({ to, children, icon: Icon }) => (
  <NavLink
    to={to}
    end={to === "/admin"} // mark index link active only on exact match
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition ${
        isActive
          ? "bg-orange-100 text-orange-700 font-semibold"
          : "text-gray-700"
      }`
    }
  >
    {Icon && <Icon className="text-lg" />}
    <span>{children}</span>
  </NavLink>
);

const Dashboard = () => {
  const [open, setOpen] = useState(false); // mobile sidebar toggle
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res =  await axios.post(`${import.meta.env.VITE_BACKEND}/api/admin/logout` , {withCredentials : true})
      navigate("/admin/login");
    } catch (error) {
       console.log("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 ">
      {/* sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 w-64 p-4 flex-shrink-0 
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          transform transition-transform duration-200 fixed md:static z-30 left-0 top-0 h-full md:h-auto`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Admin</h1>
          <button
            className="md:hidden p-1 rounded hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="space-y-2">
          {/* <SidebarLink to="/admin" icon={FiFileText}>Dashboard</SidebarLink> */}
          <SidebarLink to="/admin" icon={FiFileText}>
            Blog
          </SidebarLink>
          <SidebarLink to="/admin/contact" icon={FiUsers}>
            Contact
          </SidebarLink>
          <SidebarLink to="/admin/freelancer-student" icon={FiUsers}>
            freelancerContact 
          </SidebarLink>
          <SidebarLink to="/admin/freelancer-blog" icon={FiUsers}>
            freelancer-blog
          </SidebarLink>
          <SidebarLink to="/admin/it-student" icon={FiUsers}>
            It-contact
          </SidebarLink>
          <SidebarLink to="/admin/it-blog" icon={FiUsers}>
            It-Blog
          </SidebarLink>
        </nav>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 text-left text-red-600"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* overlay for mobile when sidebar open */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* main content */}
      <div className="flex-1 min-h-screen ">
        <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
            <h2 className="text-lg font-medium">Admin Panel</h2>
          </div>

          <div className="text-sm text-gray-600">
            {/* optional: show admin name */}
            Welcome, Admin
          </div>
        </header>

        <main className="p-6">
          {/* this is where child routes render */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
