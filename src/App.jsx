import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import ProductForm from "./components/ProductForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            <Route path="/detail/:id" element={<ProductDetail />} />

            <Route path="/cart" element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            } />

            <Route path="/admin" element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            } />

            <Route path="/admin/create" element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            } />
            <Route path="/admin/edit/:id" element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> {/* MODIFICACIÓN: Añadir ToastContainer */}
      </div>
    </Router>
  );
}

export default App;