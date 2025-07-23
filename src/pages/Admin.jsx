import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styled from 'styled-components';

const StyledH2 = styled.h2`
  font-weight: 600;
  color: #ffc107; /* Amarillo Bootstrap (warning) */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Sombra de texto sutil */
`;

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    fetch("https://687dec06c07d1a878c307e59.mockapi.io/mercado-cautivo/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al cargar la lista de productos.');
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
        toast.error("Error al cargar la lista de productos.");
      })
      .finally(() => setLoading(false));
  };

  const confirmDelete = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleDelete = () => {
    if (productToDelete) {
      fetch(`https://687dec06c07d1a878c307e59.mockapi.io/mercado-cautivo/products/${productToDelete}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Error al eliminar el producto.');
          }
          return res.json();
        })
        .then(() => {
          toast.success("Producto eliminado exitosamente.");
          fetchProducts();
          closeDeleteModal();
        })
        .catch((err) => {
          console.error("Error al eliminar:", err);
          toast.error("Error al eliminar el producto.");
          closeDeleteModal();
        });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="my-4">
      <StyledH2 className="text-warning mb-4">🛠 Administración de productos</StyledH2>

      <Button variant="success" className="mb-3" onClick={() => navigate("/admin/create")} aria-label="Agregar nuevo producto">Agregar nuevo</Button> {/* MODIFICACIÓN: Añadir aria-label */}

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Spinner animation="border" variant="warning" />
      ) : (
        <Table striped bordered hover variant="dark" aria-label="Tabla de productos administrables">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.title}</td>
                <td>{prod.category}</td>
                <td>${prod.price}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/admin/edit/${prod.id}`)}
                    aria-label={`Editar producto ${prod.title}`}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => confirmDelete(prod.id)}
                    aria-label={`Eliminar producto ${prod.title}`}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={closeDeleteModal} centered aria-labelledby="deleteModalTitle">
        <Modal.Header closeButton className="bg-dark text-warning border-warning">
          <Modal.Title id="deleteModalTitle">Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          ¿Estás seguro que quieres eliminar este producto? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer className="bg-dark border-top border-warning">
          <Button variant="secondary" onClick={closeDeleteModal} aria-label="Cancelar eliminación">
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete} aria-label="Confirmar eliminación">
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Admin;