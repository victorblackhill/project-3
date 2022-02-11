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
    const tempsTotalSec = aRecipe.infusion?.reduce((cumul,val)=>val.time+cumul,0)%60
    const strSec = String(tempsTotalSec).length < 2 ? "0"+String(tempsTotalSec) :String(tempsTotalSec)
    const tempsTotalMin = (aRecipe.infusion?.reduce((cumul,val)=>val.time+cumul,0) - tempsTotalSec)/60

    
    
   // const tempsTotalSec =aRecipe.infusion.reduce((cumul,pour)=>cumul+pour.time,0) % 60

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
                            <li key="poids" >Poids : {aRecipe.weight} g</li>
                            <li key="mouture" >Mouture : {aRecipe.grind} pour moulin Baratza Sette 30</li>
                            <p>
                                <li> <a href="https://honestcoffeeguide.com/guides/coffee-grind-size-chart" target="_blank">Equivalences entre les moulins</a></li>
                            </p>
                            
                        </ul>
                    </div>

                    <div className = "block">
                    <h3><i className="fas fa-tint"></i></h3>
                        <h3>Eau</h3>
                            <ul>
                                <li key="temperature">Température : {aRecipe.temperature} °C</li>
                                <li key="eau">Type d'eau : {aRecipe.water}</li>
                            </ul>
                    </div>
                    
                    <div className = "block">
                    <h3><i className="fas fa-glass-whiskey"></i></h3>
                    <h3>Extraction</h3>
                        <ul>
                            <li key="methode">Méthode : {aRecipe.extraction}</li>
                            <li>Durée totale : {tempsTotalMin}min{strSec}</li>
                            <li key="infusion">Infusion
                                <ol>
                                    {aRecipe.infusion?.map((pour,i)=> (<li key={i + pour.volume} >{pour.volume} mL pendant {pour.time} secondes</li>))}
                                </ol>
                            </li>
                        </ul>
                    </div>
                    <div className = "block if">
                        <h3><i className="fas fa-video"></i></h3>
                        <h3>Vidéo explicative</h3>
                        <iframe width="230"
                            src="https://www.youtube.com/embed/_44o-lCopNU">
                        </iframe>
                        </div>
                    
                </div>

                <h2>Commentaires</h2>
                {auth.isLoggedIn && <AddComment setComments={theComments} id={id} updateComments={updateComments} auth={auth}/>}
                
                {<div className="comments">
                <ul>{!auth.isLoggedIn && <li  key="signin" className="comment"> <Link to="/signin" >Identifiez-vous et laissez vos commentaires</Link></li>}</ul>
                <ul className="comment-list">
            
                    {theComments.map((comment,i)=> <OneComment comment={comment} updateComments={updateComments} auth={auth} i={i}/> )}
                    </ul>
                </div>}

            </>
}

export default OneRecipe

