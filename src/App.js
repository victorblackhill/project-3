import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom"
import AllRecipes from "./components/AllRecipes.jsx"
import OneRecipe from "./components/OneRecipe.jsx"

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<AllRecipes/>} />
          <Route path="/recipes/:id" element={<OneRecipe/>} />
        </Routes>

    </>
  );
}

export default App;
