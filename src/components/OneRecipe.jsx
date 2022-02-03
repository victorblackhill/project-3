/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import APIHandler from "../api/APIHandler";
import { Link, useParams } from "react-router-dom";
import OneComment from "./OneComment"

function OneRecipe (){
    
    const id = useParams().id
    console.log(id)
    const   [aRecipe,setRecipe] = useState({})
    const   [theComments, setComments] = useState([])

    useEffect(async ()=>{
        try{
            
            const comments = await APIHandler.post("/recipes/comments",{recipe:id})
            setComments(comments.data.comments)
            
            const recipe = await APIHandler.post("/recipes/details",{_id:id})
            setRecipe(recipe.data.recipes)

        }catch(e){console.error(e)}


    },[])

    console.log(aRecipe,theComments,theComments.length >0)

    return <>
                <div className="comments">
                {<ul id="comment-list">
                    {theComments.map((comment)=> <OneComment comment={comment} /> )}
                    </ul>}
                </div>

            </>
}

export default OneRecipe


// <i class="fa fa-pen update" data-commentid={{this.id}} ></i>
//
//
//