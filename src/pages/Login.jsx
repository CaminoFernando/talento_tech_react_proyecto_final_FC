import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const Login = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="bg-dark text-warning border border-warning shadow-sm">

            <Card.Body>
            <Card.Title className="text-center mb-4 text-warning">
              <big>Accedé a tu cuenta</big><br />
              <small>(o de quien sea, nos da igual mientras gastes dinero)</small>
            </Card.Title>

              <Form>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control type="email" placeholder="usuario@falso.com" />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="••••••" />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="warning" type="submit">
                    Entrar
                  </Button>
                  <Button variant="outline-warning" type="button">
                    Crear cuenta (solo para valientes)
                  </Button>
                  <Button variant="link" type="button" className="text-decoration-none">
                    ¿Olvidaste tu contraseña? Tranquilo, a nosotros también nos pasa.
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
