import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';

const StyledH3 = styled.h3`
  font-weight: 600;
  color: #ffc107;
  text-shadow: 1px 1px 1px rgb(0, 0, 255);
`;

const Navigation = () => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();

  const totalCartItems = getTotalItems();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" aria-label="Navegación principal del sitio">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-warning fw-bold" aria-label="Mercado Cautivo - Ir a inicio">
          <img
            src="https://media.istockphoto.com/id/1272956984/es/vector/contrae-a-las-esposas-policiales-en-vector-de-manos-criminales-en-estilo-lineal.jpg?s=612x612&w=0&k=20&c=cpyCcFB6Iz6-KFpxNv4gISaiAaCYn14OAqGXj0A8toU="
            alt="Logo Mercado Cautivo"
            style={{ height: "30px", width: "30px", objectFit: "cover", borderRadius: "50%" }}
          />
          <StyledH3>Mercado Cautivo</StyledH3>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Alternar navegación" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products" aria-label="Ver todos los productos" style={{ color: "white" }}>Todos los productos</Nav.Link>
            <Nav.Link as={Link} to="/category/smartphones" aria-label="Ver productos de categoría Smartphones">Smartphones</Nav.Link>
            <Nav.Link as={Link} to="/category/laptops" aria-label="Ver productos de categoría Laptops">Laptops</Nav.Link>
            <Nav.Link as={Link} to="/category/fragrances" aria-label="Ver productos de categoría Fragancias">Fragancias</Nav.Link>
            <Nav.Link as={Link} to="/category/beauty" aria-label="Ver productos de categoría Belleza">Belleza</Nav.Link>
            <Nav.Link as={Link} to="/category/furniture" aria-label="Ver productos de categoría Muebles">Muebles</Nav.Link>
            <Nav.Link as={Link} to="/category/groceries" aria-label="Ver productos de categoría Comestibles">Alimentación</Nav.Link>
          </Nav>

          {/* Separador visual para diferenciar grupos de enlaces */}
          <div className="d-lg-none my-2">
            <hr style={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)", margin: "0 1rem" }} />
          </div>

          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/admin" aria-label="Ir a la página de administración" style={{ color: "#ffc107", textShadow: "1px 1px 1px rgb(0, 0, 255)"}}>Admin</Nav.Link>
                <Nav.Link onClick={logout} aria-label="Cerrar sesión" style={{ textShadow: "1px 1px 1px rgb(0, 0, 255)"}}>Cerrar Sesión</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" aria-label="Iniciar sesión" style={{ textShadow: "1px 1px 1px rgb(0, 0, 255)"}}>
                <FaUserCircle className="me-1" style={{ color: "#ffc107", fontSize: "1.5rem" }}/> Iniciar sesión
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/cart" aria-label="Ver carrito de compras">
              <FaShoppingCart style={{ color: "#ffc107", fontSize: "1.5rem" }} />
              {totalCartItems > 0 && <Badge bg="warning" text="dark" className="ms-1">{totalCartItems}</Badge>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;