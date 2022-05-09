import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/navbar";
import {
    BrowserRouter as Router,
  } from 'react-router-dom';
import SingleCocktail from "./pages/single-cocktail";
import Home from "./pages/home";
import About from "./pages/about";
import Error from "./pages/error";
import Cart from "./pages/cart";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route index path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path='cocktail/:id' element={<SingleCocktail />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    );
}

export default App;
