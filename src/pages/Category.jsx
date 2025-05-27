import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

const Category = () => {
  const { categoria }           = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/category/${categoria}`)
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
  }, [categoria]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-capitalize">{categoria}</h2>

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
          No hay productos disponibles en esta categoría.
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

export default Category;
