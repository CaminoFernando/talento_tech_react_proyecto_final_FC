import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-warning fw-bold">
          <img
            src="https://media.istockphoto.com/id/1272956984/es/vector/contrae-a-las-esposas-policiales-en-vector-de-manos-criminales-en-estilo-lineal.jpg?s=612x612&w=0&k=20&c=cpyCcFB6Iz6-KFpxNv4gISaiAaCYn14OAqGXj0A8toU="
            alt="Logo Mercado Cautivo"
            style={{ height: "30px", width: "30px", objectFit: "cover", borderRadius: "50%" }}
          />
          Mercado Cautivo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-menu" />
        <Navbar.Collapse id="main-menu">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">Todos los productos</Nav.Link>
            <Nav.Link as={Link} to="/category/smartphones">Smartphones</Nav.Link>
            <Nav.Link as={Link} to="/category/laptops">Laptops</Nav.Link>
            <Nav.Link as={Link} to="/category/fragrances">Fragancias</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
            <Nav.Link as={Link} to="#">🛒</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
