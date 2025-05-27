import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <Container className="text-center">
        <p className="mb-1">
          © {new Date().getFullYear()} Mercado Cautivo - Todos los derechos retenidos
        </p>
        <p className="mb-0 small fst-italic">
          No nos hacemos responsables por lo que compres. Ni por lo que no llegue.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
