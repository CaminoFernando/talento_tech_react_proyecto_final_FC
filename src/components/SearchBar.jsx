import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange }) => {
  return (
    <InputGroup className="mb-4" role="search">
      <InputGroup.Text className="bg-secondary text-warning" id="search-addon" aria-label="Icono de búsqueda">
        <FaSearch />
      </InputGroup.Text>
      <Form.Control
        placeholder="Buscar productos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-dark text-light border-warning"
        aria-label="Buscar productos por nombre o categoría"
        aria-describedby="search-addon"
      />
    </InputGroup>
  );
};

export default SearchBar;