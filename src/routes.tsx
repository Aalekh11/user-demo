import React from "react";
import { Route, Routes } from "react-router-dom";
import Blogs from "./Containers/Blogs/Blogs";
import Dashboard from "./Containers/Dashboard/Dashboard";
import EditBlog from "./Containers/EditBlog/EditBlog";

function DefinedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="editblog" element={<EditBlog />} />
    </Routes>
  );
}
export default DefinedRoutes;
