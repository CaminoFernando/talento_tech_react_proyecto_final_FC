import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { toast } from 'react-toastify';
import styled from 'styled-components';

const StyledH2 = styled.h2`
  font-weight: 600;
  color: #ffc107;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;


const Cart = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePurchase = () => {
    if (cart.length > 0) {
      toast.success(`Ya no hay vuelta atrás... ¡Gracias por tu compra! El total es $${total.toFixed(2)}`);
      clearCart();
    } else {
      toast.info("Tu carrito está vacío. ¡Agrega algo antes de comprar!");
    }
  };

  return (
    <Container className="my-4">
      <Row className="mb-4 align-items-center">
        <Col xs={12} md={6}>
          <StyledH2 className="text-warning mb-0">🛒 Carrito de compras</StyledH2>
        </Col>
        <Col xs={12} md={6} className="text-center mt-3 mt-md-0 d-flex justify-content-center align-items-center">
          {cart.length > 0 && (
            <>
              <Button
                variant="warning"
                className="mb-0 mx-auto"
                style={{
                  backgroundColor: "#ffc107",
                  color: "#212529",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: "bold",
                  display: "block",
                  width: "fit-content",
                  fontSize: "1.5rem"
                }}
                onClick={handlePurchase}
                aria-label={`Comprar productos con un total de $${total.toFixed(2)}`}
              >
                ¿Comprar? ${total.toFixed(2)} no es nada...
              </Button>
              <Button variant="danger" className="border-danger ms-3" onClick={clearCart} aria-label="Vaciar todo el carrito">
                Vaciar carrito
              </Button>
            </>
          )}
        </Col>
      </Row>

      {cart.length === 0 ? (
        <p className="text-light">Tu carrito está vacío. ¿No te tienta ni una ofertita?</p>
      ) : (
        <Row>
          {cart.map((item) => (
            <Col md={4} key={item.id} className="mb-3">
              <Card
                className="h-100 text-light bg-dark border border-warning shadow-sm"
              >
                <Card.Img
                  variant="top"
                  src={item.image || item.thumbnail} 
                  alt={item.title}
                  style={{ height: "auto", maxWidth: "100%", maxHeight: "250px", objectFit: "contain" }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="text-warning">{item.title}</Card.Title>
                    <Card.Text className="text-white mb-1"><strong>Categoría:</strong> {item.category}</Card.Text>
                    <Card.Text style={{ fontSize: "1.2rem", marginBottom: "10px" }} className="text-warning fw-bold">${item.price} x {item.quantity} unidades</Card.Text>
                  </div>
                  <div className="d-grid gap-2">
                    <Button
                      variant="warning"
                      onClick={() => addToCart(item)}
                      aria-label={`Agregar una unidad de ${item.title} al carrito`}
                      >
                        Agregar unidad
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="mt-auto"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Quitar una unidad de ${item.title} del carrito`}
                        >
                        Quitar unidad
                      </Button>
                    </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Cart;