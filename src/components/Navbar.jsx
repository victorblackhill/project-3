import React, { useState, useEffect, } from "react";
import { Link,useLocation } from "react-router-dom";
import AuthService from "./../api/AuthService"

function Navbar({auth,resetAuth}){

    const location = useLocation()
    
    const send = async ()=>{
        try{
            const res = await AuthService.logout()
            resetAuth()
        }catch(e){
            console.log(e.response)
        }
    }   
    
    return <nav className="nav-style">
                <ul>
                    <li><Link to="/">List of recipes</Link></li>
                    {auth.isLoggedIn    &&  
                    <>  <li><Link to="/FavoriteRecipes">Recettes préférées</Link></li>    
                        <li onClick={send}><Link to={location.pathname}>Logout</Link></li>
                    </>}
                    {!auth.isLoggedIn   &&  
                    <>  <li><Link to="/Signin">Signin</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>}
                </ul>
                
                
                
                {auth.isLoggedIn && <p> Welcome {auth.user.email} </p>}
            </nav>
}

export default Navbar;


//Activate to test authentication
/*
const sendIs = async ()=>{
    try{
        const res = await AuthService.isLoggedIn()
        console.log(res)
    }catch(e){
        console.log(e.response)
}
}
*/

//Add to HTML to test authentication 
/*
<li onClick={sendIs} >TestIsLoggedIn</li>
*/
    