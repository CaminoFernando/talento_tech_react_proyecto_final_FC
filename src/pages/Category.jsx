import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Pagination, Alert } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import styled from 'styled-components';

const StyledH2 = styled.h2`
  font-weight: 600;
  color: #ffc107;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Category = () => {
  const { categoria } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const productsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://dummyjson.com/products/category/${categoria}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al cargar productos de la categoría "${categoria}".`);
        }
        return res.json();
      })
      .then((data) => setAllProducts(data.products.map(prod => ({ ...prod, id: `dummy-${prod.id}`, source: 'dummyjson' })))) // MODIFICACIÓN: Prefijo al ID
      .catch((err) => {
        console.error("Error al cargar categoría:", err);
        setError(`No se pudieron cargar los productos de la categoría "${categoria}". Por favor, inténtalo de nuevo más tarde.`);
      })
      .finally(() => setLoading(false));
  }, [categoria]);

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
      <StyledH2 className="text-warning mb-4">📂 Categoría: {categoria}</StyledH2>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {loading ? (
        <Spinner animation="border" variant="warning" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
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
        <Pagination className="justify-content-center mt-4" data-bs-theme="dark">
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
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default Category;