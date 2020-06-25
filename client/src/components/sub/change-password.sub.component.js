import React from "react";
import { Form, Button } from "react-bootstrap";

function ChangePassword(props) {
    return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group>
        <Form.Label>Old Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Old Password"
          value={props.oldPassword}
          onChange={props.handleOldPasswordChange}
        ></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>New Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="New Password"
          value={props.newPassword}
          onChange={props.handleNewPasswordChange}
        ></Form.Control>
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        Change Password
      </Button>
      <br />
      <Form.Label readOnly class="text-danger">
        {props.SubmitError}
      </Form.Label>
    </Form>
    )
}

export default ChangePassword;