import React, { useState, useEffect, } from "react";
import { Link,useLocation } from "react-router-dom";
import AuthService from "./../api/AuthService"

function Navbar({auth}){

    const location = useLocation()
    console.log(location)
    
    return <nav>
                <Link to="/">List of recipes</Link>
                <Link to="/signup">Signup</Link>
                <Link to={location.pathname}>Logout</Link>
                {auth.user && <p> Welcome {auth.user.email} </p>}
            </nav>
}

export default Navbar;