import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <div className="bg-secondary bg-opacity-100 py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 className="mb-4 text-warning">¡Bienvenido a Mercado Cautivo!</h1>
            <p className="lead fw-semibold text-dark">
              Donde lo que buscás… quizás no sea del todo legal pero está en oferta!
            </p>
            <hr className="border-warning border-2 opacity-75" />
            <p className="text-muted fst-italic">
              Nadie te obliga a comprar… pero pensalo bien antes de sumar un producto al carrito. Estás advertido.
            </p>
          </Col>
        </Row>

        <Row className="mt-5 justify-content-center text-center">
          <Col md={8}>
            <h4 className="text-warning">Ofertas que no podés rechazar</h4>
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
