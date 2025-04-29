import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/dashboard" className="font-bold text-green-600">Dashboard</Link>
        <Link to="/recipes" className="text-blue-600">Recipes</Link>
      </div>
      <button onClick={logout} className="text-red-600 font-semibold">Logout</button>
    </div>
  );
}
