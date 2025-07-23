import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const StyledH2 = styled.h2`
  font-weight: 600;
  color: #ffc107;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;


const ProductDetail = () => {
  const { id: prefixedId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const [sourcePrefix, originalId] = prefixedId.split('-');
    let fetchUrl = '';

    if (sourcePrefix === 'dummy') {
      fetchUrl = `https://dummyjson.com/products/${originalId}`;
    } else if (sourcePrefix === 'mock') {
      fetchUrl = `https://687dec06c07d1a878c307e59.mockapi.io/mercado-cautivo/products/${originalId}`;
    } else {
      fetchUrl = `https://dummyjson.com/products/${prefixedId}`;
    }

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al cargar el detalle del producto.');
        }
        return res.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          throw new Error('Producto no encontrado.');
        }
        setProduct({ ...data, id: prefixedId });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener el producto:", err);
        setLoading(false);
        setError(err.message === 'Producto no encontrado.' ? "Producto no encontrado." : "No se pudo cargar el detalle del producto. Inténtalo de nuevo más tarde.");
      });
  }, [prefixedId]);

  const handleAdd = () => {
    addToCart(product);
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="warning" role="status">
          <span className="visually-hidden">Cargando detalle del producto...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger" aria-live="polite">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Helmet>
        <title>Mercado Cautivo - {product ? product.title : 'Detalle del Producto'}</title>
      </Helmet>
      <Row>
        <Col md={6}>
          <Card className="bg-dark">
            <Card.Img
              src={product.thumbnail || product.image}
              alt={product.title}
              style={{ objectFit: "cover", height: "400px" }}
              aria-label={`Imagen del producto ${product.title}`}
            />
          </Card>
        </Col>
        <Col md={6}>
          <StyledH2 className="text-warning">{product.title}</StyledH2>
          <p className="text-light">{product.description}</p>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ffc107" }}>💸 ${product.price}</p>
          <p className="text-light">Categoría: {product.category}</p>

          <Button variant="warning" onClick={handleAdd} aria-label={`Agregar ${product.title} al carrito`}>
            Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;