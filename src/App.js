import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom"
import AllRecipes from "./components/AllRecipes.jsx"

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<AllRecipes /> } />
        </Routes>

    </>
  );
}

export default App;
