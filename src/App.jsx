import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-dark">
        <Navigation />
        <main className="flex-fill bg-secondary bg-opacity-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category/:categoria" element={<Category />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
