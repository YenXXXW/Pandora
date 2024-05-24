import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

export default function App() {
  return (
    <main className="w-full px-[5%]">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/logout"} element={<Logout />} />
      </Routes>
    </main>
  );
}
