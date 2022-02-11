import React, { useState, useEffect } from "react";
import APIHandler from "../api/APIHandler";
import { Link } from "react-router-dom";

function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const res = await APIHandler.get("/all-recipes");

      setRecipes([...res.data.recipes]);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      {" "}
      <h1><i className="fas fa-coffee"></i> Nos recettes</h1>
      <div key="blocks" className="blocks">
        <>
          {recipes.map((recipe) => (
            <div key={recipe.name} className="block">
              <h2>{recipe.name} </h2>
              <h4>{recipe.description}</h4>
              <Link to={"/recipes/" + recipe._id}>
                <h4> Autres détails ici !</h4>
              </Link>
            </div>
          ))}
        </>
      </div>
    </>
  );
}

export default AllRecipes;
