import React from "react";
import { Form, Button } from "react-bootstrap";

const SearchForm = (props) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSearch();
      }}
      className="search-form-container"
    >
      <Form.Group controlId="formBasicPickFrom">
        <Form.Label>Pick From</Form.Label>
        <Form.Control type="text" placeholder="Muradpur" />
      </Form.Group>

      <Form.Group controlId="formBasicPickTo">
        <Form.Label>Pick To</Form.Label>
        <Form.Control type="text" placeholder="Agrabad" />
      </Form.Group>

      <Form.Group controlId="date">
        <Form.Label>Select Date</Form.Label>
        <Form.Control type="date" name="date" placeholder="Date" />
      </Form.Group>

      <Button className="city-btn full-width-btn" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
