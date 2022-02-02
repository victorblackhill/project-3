import React, {useState,useEffect} from "react"
import APIHandler from "../api/APIHandler"


function AllRecipes (){

    const [recipes,setRecipes]=useState([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async ()=>{
        try{
            const res = await APIHandler.get("/all-recipes")
            
            setRecipes([...res.data.recipes])
        }catch(e){console.error(e)}

    },[])

    console.log(recipes)


    return <> <h1>Our recipes</h1>

               <div key="blocks" className="blocks">
                <>{recipes.map( (recipe) =>(
                    <div key={recipe.name} className = "block">
                        <h2>{recipe.name} </h2>
                        <h4>{recipe.description}</h4>
                        
                        <h4><a href="/recipes/{{_id}}">Autres détails ici !</a></h4>
                    </div>
                ))}
                </>

               </div> 

    </>
}

export default AllRecipes