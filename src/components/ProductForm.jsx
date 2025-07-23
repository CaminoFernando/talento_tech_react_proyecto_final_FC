import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Spinner, Alert } from "react-bootstrap";
import { toast } from 'react-toastify';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      fetch(`https://687dec06c07d1a878c307e59.mockapi.io/mercado-cautivo/products/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Error al cargar el producto.');
          }
          return res.json();
        })
        .then((data) => setForm(data))
        .catch((err) => {
          console.error("Error al cargar producto:", err);
          toast.error("Error al cargar el producto para edición.");
          setError("No se pudo cargar el producto.");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (parseFloat(form.price) <= 0) {
      setError("El precio debe ser mayor a 0.");
      toast.error("El precio debe ser mayor a 0.");
      return;
    }

    if (form.description.length < 10) {
      setError("La descripción debe tener al menos 10 caracteres.");
      toast.error("La descripción debe tener al menos 10 caracteres.");
      return;
    }

    setLoading(true);
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `https://687dec06c07d1a878c307e59.mockapi.io/mercado-cautivo/products/${id}`
      : "https://687dec06c07d1a878c307e59.mockapi.io/mercado-cautivo/products";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al ${isEdit ? 'guardar' : 'crear'} el producto.`);
        }
        return res.json();
      })
      .then(() => {
        toast.success(`Producto ${isEdit ? 'actualizado' : 'creado'} exitosamente.`);
        navigate("/admin");
      })
      .catch((err) => {
        console.error("Error al guardar producto:", err);
        toast.error(`Error al ${isEdit ? 'actualizar' : 'crear'} el producto.`);
        setError(`No se pudo ${isEdit ? 'guardar' : 'crear'} el producto.`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container className="my-4">
      <h2 className="text-warning mb-4">
        {isEdit ? "✏️ Editar producto" : "🆕 Crear nuevo producto"}
      </h2>

      {loading ? (
        <Spinner animation="border" variant="warning" />
      ) : (
        <Form onSubmit={handleSubmit} className="text-light" aria-label={isEdit ? "Formulario de edición de producto" : "Formulario de creación de nuevo producto"}> {/* MODIFICACIÓN: Añadir aria-label */}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              aria-label="Título del producto"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              aria-label="Precio del producto"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              aria-label="Categoría del producto"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              aria-label="Descripción del producto"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Imagen (URL)</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              aria-label="URL de la imagen del producto"
            />
          </Form.Group>

          <Button type="submit" variant="warning" aria-label={isEdit ? "Guardar cambios del producto" : "Crear nuevo producto"}>
            {isEdit ? "Guardar cambios" : "Crear producto"}
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default ProductForm;