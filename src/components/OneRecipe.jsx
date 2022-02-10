/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import APIHandler from "../api/APIHandler";
import { Link, useParams } from "react-router-dom";
import OneComment from "./OneComment"
import AddComment from "./AddComment"


function OneRecipe ({auth,getAuth}){
    
    const id = useParams().id
    const [aRecipe,setRecipe] = useState({})
    const [theComments, setComments] = useState([])

    const updateComments = async ()=>{

        try{
            const comments = await APIHandler.post("/recipes/comments",{recipe:id})
            setComments(comments.data.comments)
        }catch(e){console.error(e)}
    }

    const favorite = async () =>{
        try{
            const updatedUser = await APIHandler.post("/user/update",{...auth.user,favorites:[...auth.user.favorites,aRecipe._id]})
            console.log(updatedUser)
            getAuth(updatedUser.data.myFetch,auth.isLoggedIn)
        }catch(e){console.error(e)}
    }

    const unFavorite = async()=>{
        try{
            const updatedUser = await APIHandler.post("/user/update",{...auth.user,favorites:auth.user.favorites.filter((recipe)=>recipe!==aRecipe._id)})
            console.log(updatedUser)
            getAuth(updatedUser.data.myFetch,auth.isLoggedIn)
        }catch(e){console.error(e)}
    }

    useEffect(async ()=>{
        try{
            await updateComments()
            const recipe = await APIHandler.post("/recipes/details",{_id:id})
            setRecipe(recipe.data.recipes[0])

        }catch(e){console.error(e)}


    },[])

    return <>  <div className="heart-block" > 
                <h1>{aRecipe.name}</h1>
                <h2>{aRecipe.description}</h2>
                
                {auth.isLoggedIn && auth.user.favorites.indexOf(aRecipe._id)>-1 &&
                    <>  <p><i onClick={unFavorite} className="fas fa-heart"></i>
                            Une de mes recettes préférées</p>
                    </>}
                {auth.isLoggedIn && auth.user.favorites.indexOf(aRecipe._id)===-1 &&
                    <>  <p><i onClick={favorite} className="far fa-heart"></i>
                            Ajouter à mes recettes préférées</p>
                    </>}
                </div>

                <div className="blocks">

                    <div className = "block">
                        <h3><i className="fas fa-mortar-pestle"></i></h3>
                        <h3>Café</h3>
                        <ul>
                            <li key="mouture" >Grind: {aRecipe.grind} </li>
                            <li key="poids" >Weight: {aRecipe.weight}</li>
                        </ul>
                    </div>

                    <div className = "block">
                    <h3><i className="fas fa-tint"></i></h3>
                        <h3>Eau</h3>
                            <ul>
                                <li key="temperature">Température: {aRecipe.temperature} </li>
                                <li key="eau">Type d'eau: {aRecipe.water}</li>
                            </ul>
                    </div>
                    
                    <div className = "block">
                    <h3><i className="fas fa-glass-whiskey"></i></h3>
                    <h3>Extraction</h3>
                        <ul>
                            <li key="methode">Méthode: {aRecipe.extraction}</li>
                            <li key="infusion" >Infusion
                                <ol>
                                    {aRecipe.infusion?.map((pour,i)=> (<li key={i + pour.volume} >{pour.volume} mL during {pour.time} seconds</li>))}
                                </ol>
                            </li>
                        </ul>
                    </div>
                    
                </div>

                <h2>Comments</h2>
                {auth.isLoggedIn && <AddComment setComments={theComments} id={id} updateComments={updateComments} auth={auth}/>}
                
                {<div className="comments">
                <ul>{!auth.isLoggedIn && <li  key="signin" className="comment"> <Link to="/signin" >Signin to comment</Link></li>}</ul>
                <ul className="comment-list">
            
                    {theComments.map((comment,i)=> <OneComment comment={comment} updateComments={updateComments} auth={auth} i={i}/> )}
                    </ul>
                </div>}

            </>
}

export default OneRecipe

