import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Pagination, Alert } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const StyledH2 = styled.h2`
  font-weight: 600;
  color: #ffc107;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;


const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const productsPerPage = 8;

  const allowedCategories = [
    'smartphones',
    'laptops',
    'fragrances',
    'beauty',
    'furniture',
    'groceries'
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchDummyJsonProducts = fetch("https://dummyjson.com/products?limit=100")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al cargar productos de DummyJSON.');
        }
        return res.json();
      })
      .then((data) => data.products.map(prod => ({ ...prod, id: `dummy-${prod.id}`, source: 'dummyjson' })));

    const fetchMockApiProducts = fetch("https://687dec06c07d1a878c307e59.mockapi.io/mercado-cautivo/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al cargar productos de MockAPI.');
        }
        return res.json();
      })
      .then((data) => data.map(prod => ({ ...prod, id: `mock-${prod.id}`, source: 'mockapi' })));

    Promise.allSettled([fetchDummyJsonProducts, fetchMockApiProducts])
      .then((results) => {
        const combinedProducts = [];
        let hasError = false;
        let errorMessage = "";

        if (results[0].status === 'fulfilled') {
          combinedProducts.push(...results[0].value);
        } else {
          hasError = true;
          errorMessage += results[0].reason.message + " ";
        }

        if (results[1].status === 'fulfilled') {
          combinedProducts.push(...results[1].value);
        } else {
          hasError = true;
          errorMessage += results[1].reason.message;
        }

        if (hasError && combinedProducts.length === 0) {
          setError(errorMessage.trim() || "No se pudieron cargar productos de ninguna fuente. Inténtalo de nuevo más tarde.");
        } else if (hasError && combinedProducts.length > 0) {
          toast.warning("Ocurrió un problema parcial al cargar productos. Algunos productos aquí podrían no estar disponibles.");
        }
        
        const filteredByAllowedCategories = combinedProducts.filter(prod => {
          if (prod.source === 'mockapi') {
            return true;
          }
          return allowedCategories.includes(prod.category);
        });

        setAllProducts(filteredByAllowedCategories);
      })
      .catch((err) => {
        console.error("Error inesperado al combinar productos:", err);
        setError("Ocurrió un error inesperado al procesar los productos.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredProducts = allProducts.filter((prod) =>
    prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <Container className="my-4">
      <Helmet>
        <title>Mercado Cautivo - Todos los Productos</title>
      </Helmet>
      <StyledH2 className="mb-4">🛍 Todos los productos</StyledH2>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {loading ? (
        <Spinner animation="border" variant="warning" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger" aria-live="polite">{error}</Alert>
      ) : (
        <Row>
          {visibleProducts.map((prod) => (
            <Col key={prod.id} sm={12} md={6} lg={3} className="mb-4">
              <ProductCard product={prod} />
            </Col>
          ))}
        </Row>
      )}

      {totalPages > 1 && !error && (
        <Pagination className="justify-content-center mt-4" data-bs-theme="dark" aria-label="Paginación de productos">
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                backgroundColor: index + 1 === currentPage ? '#ffc107' : '#212529',
                color: index + 1 === currentPage ? '#212529' : '#ffc107',
                border: '3px solid #ffc107',
                fontWeight: 'bold'
              }}
              aria-label={`Ir a la página ${index + 1} de productos`}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default Products;