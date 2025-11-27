import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from "./Details.jsx";
import GovtLandingPage from "./components.jsx/GovtlandingPage.jsx";
import SarkariJobAlerts from "./components.jsx/SarkariJobAlert.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import ProtectedRoute from "./Admin/ProtactedRoute.jsx";
import AdmibBlog from "./Admin/AdminBlog.jsx";
import AdminBlogDe from "./Admin/AdminBlogDe.jsx";
import Blog from "./components.jsx/Blog.jsx";
import BlogDetailPage from "./components.jsx/BlogDetails.jsx";
import StudentsTable from "./Admin/ContactDetails.jsx";
import FreelancerStudents from "./Admin/FreelancerContact.jsx";
import FreelancerBlogModalPage from "./Admin/FreelancerBlog.jsx";
import FreelancerBlogDetailPage from "./Admin/FreelancerBlogDetails.jsx";
import ItStudents from "./Admin/ItContact.jsx";
import ItBlog from "./Admin/ItBlog.jsx";

const router = createBrowserRouter([
  // {path : '/' , element : <App/>},
  { path: "/details/:id", element: <Details /> },
  { path: "/", element: <GovtLandingPage /> },
  // {path : '/' , element : <SarkariJobAlerts/>},
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blogDetails/:id", element: <BlogDetailPage /> },

  {
    path: "/admin",
    element:  <ProtectedRoute><Dashboard /></ProtectedRoute> ,
    children: [
      // {index : true , element :<ProtectedRoute><GovtLandingPage/></ProtectedRoute>},
      // {path: 'login'  , element :<AdminLogin/>},
      {
        // path: "adminBlog",
        index : true , 
        element: (
          <ProtectedRoute>
            <AdmibBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: "details/:id",
        element: (
          <ProtectedRoute>
            <AdminBlogDe />
          </ProtectedRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <ProtectedRoute>
            <StudentsTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "freelancer-student",
        element: (
          <ProtectedRoute>
            <FreelancerStudents/>
          </ProtectedRoute>
        ),
      },
      {
        path: "freelancer-blog",
        element: (
          <ProtectedRoute>
            <FreelancerBlogModalPage/>
          </ProtectedRoute>
        ),
      },
      {
        path: "freelancer-details/:id",
        element: (
          <ProtectedRoute>
            <FreelancerBlogDetailPage/>
          </ProtectedRoute>
        ),
      },
      {
        path: "it-Student",
        element: (
          <ProtectedRoute>
            <ItStudents/>
          </ProtectedRoute>
        ),
      },
      {
        path: "it-blog",
        element: (
          <ProtectedRoute>
            <ItBlog/>
          </ProtectedRoute>
        ),
      },
    ],
  },

  { path: "/admin/login", element: <AdminLogin /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
