import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", expiryDate: "" });

  const fetchItems = async () => {
    try {
      const res = await API.get("/items");
      setItems(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired");
        navigate("/");
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post("/items", form);
      setForm({ name: "", expiryDate: "" });
      fetchItems();
    } catch (err) {
      alert("Error adding item");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-4">
      <Navbar />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Grocery Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleAdd} className="mb-6">
        <div className="flex gap-4 flex-wrap">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Item Name"
              className="border p-2 rounded w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="w-full md:w-1/3">
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={form.expiryDate}
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
            >
              Add
            </button>
          </div>
        </div>
      </form>

      <div className="grid gap-4">
        {items.length === 0 ? (
          <p className="text-gray-600">No items yet. Add something!</p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
              <p className="text-gray-600">
                Expires on:{" "}
                {new Date(item.expiryDate).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
