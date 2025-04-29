import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const res = await API.get("/items/recipes"); // This route returns suggested recipes
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
      alert("Could not fetch recipes.");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
        <Navbar/>
      <h2 className="text-2xl font-bold mb-6">Suggested Recipes</h2>
      <div className="grid gap-4">
        {recipes.length === 0 ? (
          <p>No recipes found yet. Add some groceries first!</p>
        ) : (
          recipes.map((recipe, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
