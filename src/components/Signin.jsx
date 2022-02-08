import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AuthService from "../api/AuthService"

function Signin({getAuth}){

    const [user,setUser]= useState({email:"",password:""})
    const [message,setMessage] = useState("")

    const handleChangeEmail = (e)=>{
        setUser({...user,email:e.target.value})
    }

    const handleChangePassword = (e)=>{
        setUser({...user,password:e.target.value})
        
    }

    const send = async ()=>{
        try{
            const res = await AuthService.signin(user.email, user.password)
            console.log(">  >   >",res)
            getAuth(res, true)
            //setMessage("User created")
        }catch(e){
            console.log(e.response)
            setMessage(e.response.data.errorMessage||e.response.data.message)}
    }

    console.log(user,message)
    

    return <div className="block-comment" >
                <h1>Accédez à votre compte</h1>
                {message && <div className="flash">{message}</div>}
                <label>
                   <h4>Email</h4>
                    <input className="block"
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleChangeEmail}
                    />
                </label>
                <label>
                    <h4>Password</h4>
                    <input
                        className="block"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChangePassword}
                        />
                </label>
                <button onClick={send}>Accéder</button>
                <h3>Vous n'avez pas encore votre compte ? C'est par <Link to={"/signup"} >ici</Link> !</h3>
                

    </div>
}

export default Signin