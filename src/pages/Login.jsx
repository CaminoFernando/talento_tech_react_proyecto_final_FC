import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      toast.success("Inicio de sesión exitoso ¡Es momento de gastar dinero!");
      navigate("/products");
    } else {
      toast.error("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 bg-dark text-warning border border-warning shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4 text-warning">
                <big>Accedé a tu cuenta</big><br />
                <small>(o de quien sea, nos da igual mientras gastes dinero)</small>
              </Card.Title>

              <Form onSubmit={handleSubmit} aria-label="Formulario de inicio de sesión">
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="usuario@falso.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Campo de correo electrónico"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label="Campo de contraseña"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="warning" type="submit" aria-label="Iniciar sesión">
                    Entrar
                  </Button>
                  <Button variant="outline-warning" type="button" aria-label="Crear nueva cuenta">
                    Crear cuenta (solo para valientes)
                  </Button>
                  <Button variant="link" type="button" className="text-decoration-none" aria-label="Recuperar contraseña"> 
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