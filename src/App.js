import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom"
import AllRecipes from "./components/AllRecipes.jsx"
import OneRecipe from "./components/OneRecipe.jsx"
import FavoriteRecipes from "./components/FavoriteRecipes"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import {useState} from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {

  const [auth,setAuth]=useState({
    isLoggedIn: false,
    user: {favorites:[]}
  })

  const getAuth = (userObj,loggedIn)=>{
    setAuth({
      user: userObj,
      isLoggedIn: loggedIn
    })
  }

  const resetAuth = ()=>setAuth({
    isLoggedIn: false,
    user: {favorites:[]}
  })

  console.log("theuser",auth)

  return (
    <>  
        <Navbar auth={auth}  resetAuth = {resetAuth} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"></link>
        <Routes>
          <Route path="/" element={<AllRecipes />} />
          <Route path="/FavoriteRecipes" element={<FavoriteRecipes auth={auth} />} />
          <Route path="/recipes/:id" element={<OneRecipe auth={auth} getAuth={getAuth}/>} />
          <Route path="/signup" element= {<Signup getAuth={getAuth} auth={auth} />} />
          <Route path="/signin" element= {<Signin getAuth={getAuth} auth={auth} />} />
        </Routes>
        <Footer/>
        

    </>
  );
}

export default App;
