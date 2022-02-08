import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom"
import AllRecipes from "./components/AllRecipes.jsx"
import OneRecipe from "./components/OneRecipe.jsx"
import Signup from "./components/Signup"
import {useState} from "react"
import Navbar from "./components/Navbar"

function App() {

  const [auth,setAuth]=useState({
    isLoggedIn: false,
    user: null
  })

  const getAuth = (userObj,loggedIn)=>{
    setAuth({
      user: userObj,
      isLoggedIn: loggedIn
    })
  }

  console.log("theuser",auth)

  return (
    <>  
        <Navbar auth={auth}/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"></link>
        <Routes>
          <Route path="/" element={<AllRecipes />} />
          <Route path="/recipes/:id" element={<OneRecipe/>} />
          <Route path="/signup" element= {<Signup getAuth={getAuth} />} />
         
        </Routes>

    </>
  );
}

export default App;
