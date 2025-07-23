import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  font-weight: 600;
  color: #ffc107;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const StyledH2 = styled.h2`
  font-weight: 600;
  color:rgb(0, 0, 0);
  text-shadow: 1px 1px 1px rgb(109, 100, 0);
`;


const Home = () => {
  return (
    // MODIFICACIÓN: Añadir Helmet
    <div className="bg-secondary bg-opacity-100 py-5">
      <Helmet>
        <title>Mercado Cautivo - Inicio</title>
      </Helmet>
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <StyledH1 className="mb-4 text-warning">¡Bienvenido a Mercado Cautivo!</StyledH1>
            <StyledH2 className="lead fw-semibold text-dark">Donde lo que buscás… quizás no sea del todo legal pero está en oferta!</StyledH2>
            <hr className="border-warning border-2 opacity-75" />
            <p className="text-muted fst-italic" style={{ fontSize: "1.2rem" }}>
              Nadie te obliga a comprar… pero pensalo bien antes de sumar un producto al carrito. Estás advertido.
            </p>
          </Col>
        </Row>

        <Row className="mt-5 justify-content-center text-center">
          <Col md={8}>
            <h4 className="text-warning" style={{ textShadow: "1px 1px 1px rgb(109, 100, 0)" }}>¡Ofertas que no podés rechazar!</h4>
            <p className="text-dark">
              Pagá en cómodas cuotas… o incómodas. Eso lo veremos en tu próximo resumen.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;