import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { id, title, thumbnail, category, price, image } = product;
  const imageUrl = image || thumbnail;

  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <Card
      className="h-100 text-light bg-dark border border-warning"
    >
      <Link to={`/detail/${id}`}>
      <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
          overflow: 'hidden'
        }}>
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div style={{ minHeight: "100px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <Card.Title style={{ fontSize: "1.2rem" }} className="text-warning">{title}</Card.Title>
          <Card.Text className="text-white mb-1"><strong>Categoría:</strong> {category}</Card.Text>
          <Card.Text style={{ fontSize: "1.2rem", marginBottom: "10px" }} className="text-warning fw-bold">${price}</Card.Text>
        </div>
        <Button variant="warning" className="mt-auto" onClick={handleAdd}>
          Agregar al carrito <br /> <small>(bajo tu propio riesgo)</small>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;