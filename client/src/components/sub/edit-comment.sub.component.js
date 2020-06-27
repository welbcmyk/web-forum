import React from "react";
import { Form, Button } from "react-bootstrap";

function EditComment(props) {
  return (
    <Form class="card container" onSubmit={props.handleSubmit}>
      <br />
      <Form.Group>
        <Form.Control
          required
          as="textarea"
          placeholder="Body"
          rows="5"
          onChange={props.handleBodyChange}
          value={props.body}
        ></Form.Control>
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        {props.submitBtn}
      </Button>
      <Form.Label class="text-danger">{props.SubmitError}</Form.Label>
    </Form>
  );
}

export default EditComment;
