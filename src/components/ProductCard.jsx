import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ title, image, price, category }) => {
  return (
    <Card className="h-100 bg-dark text-warning border border-warning shadow-sm">
      <Card.Img
        variant="top"
        src={image}
        style={{ height: "250px", objectFit: "contain" }}
      />
      
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: "1rem" }}>{title}</Card.Title>
        
        <Card.Text className="text-white mb-1">
          <strong>Categoría:</strong> {category}
        </Card.Text>
        
        <Card.Text className="fw-bold mb-3">${price}</Card.Text>
        
        <Button variant="warning" className="mt-auto" disabled>
          Agregar al carrito<br />
          <small>(bajo tu propio riesgo)</small>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
