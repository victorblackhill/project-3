import React, { useState, useEffect } from "react";
import APIHandler from "../api/APIHandler";
import { Link } from "react-router-dom";

function FavoriteRecipes({auth}) {
  const [recipes, setRecipes] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const res = await APIHandler.get("/all-recipes");
      const favorites = res.data.recipes.filter((recipe)=> auth.user.favorites.indexOf(recipe._id)>-1 )
      console.log(">>>> >>>>",favorites,res.data.recipes)
      setRecipes(favorites);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      {" "}
      <h1><i className="fas fa-heart"></i> Mes recettes préférées</h1>
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

export default FavoriteRecipes;