import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    setError(null); // Limpiar errores anteriores
    setLoading(true);

    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Productos destacados</h2>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Cargando productos…</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && products.length === 0 && (
        <Alert variant="warning" className="text-center">
          No hay productos disponibles por el momento.
        </Alert>
      )}

      <Row>
        {products.map((p) => (
          <Col md={4} lg={3} key={p.id} className="mb-4">
            <ProductCard
              title={p.title}
              image={p.thumbnail}
              price={p.price}
              category={p.category}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
