import React, { useState, useEffect, } from "react";
import { Link,useLocation } from "react-router-dom";
import AuthService from "./../api/AuthService"

function Navbar({auth,resetAuth}){

    const location = useLocation()
    
    const [hide,setHide]=useState(0)
    const toggleHide = ()=>{setHide(!hide)}
    
    const send = async ()=>{
        try{
            const res = await AuthService.logout()
            resetAuth()
        }catch(e){
            console.log(e.response)
        }
    }
    
 
    
    return <>

            {hide &&
            <>
                <nav className="nav-style transparent" >
                <ul className="transparent">
                <i onClick={toggleHide} className="fas fa-bars" > </i>
                </ul>
                </nav>
            </>   }

           {!hide &&
            <>



            <nav className="nav-style">
                <ul>
                    <i onClick={toggleHide} className="fas fa-bars"></i>
                    <img src="/alondra_logo.png"></img>
                    
                    {auth.isLoggedIn && <> <li> <span>Welcome </span> <br/>
                                        <span>{auth.user.email}</span>
                                        </li> </> } 
                    <li onClick={toggleHide}><Link to="/">Toutes les recetts</Link></li>
                    {auth.isLoggedIn    &&  
                    <>  <li onClick={toggleHide}><Link to="/FavoriteRecipes">Mes recettes préférées</Link></li>    
                        <li onClick={toggleHide} onClick={send}><Link to={location.pathname}>Déconnection</Link></li>
                    </>}
                    {!auth.isLoggedIn   &&  
                    <>  <li onClick={toggleHide} ><Link to="/Signin">Signin</Link></li>
                        <li onClick={toggleHide} ><Link to="/signup">Signup</Link></li>
                    </>}
                </ul>

            </nav>
            </>} 


            </>
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
    