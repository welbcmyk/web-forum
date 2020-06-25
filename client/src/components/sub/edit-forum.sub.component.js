import React from "react";
import { Form, Button } from "react-bootstrap";

function EditForum(props) {
  return (
    <Form class="card container" onSubmit={props.handleSubmit}>
      <br />
      <Form.Group>
        <Form.Control
          required
          type="text"
          placeholder="Name"
          rows="2"
          onChange={props.handleNameChange}
          value={props.name}
        ></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Control
          required
          type="text"
          placeholder="Description"
          rows="5"
          onChange={props.handleDescriptionChange}
          value={props.description}
        ></Form.Control>
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        {props.submitBtn}
      </Button>
      <div>
        <Form.Label class="text-danger">{props.SubmitError}</Form.Label>
      </div>
    </Form>
  );
}

export default EditForum;
