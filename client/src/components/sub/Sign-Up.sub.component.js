import React from "react";
import { Form, Button } from 'react-bootstrap';

function SignUpComp(props) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
            required
                type="name"
                placeholder="Username"
                value={props.username}
                onChange={props.handleUsernameChange}
                ></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
            required
                type="email"
                placeholder="E-Mail"
                value={props.email}
                onChange={props.handleEmailChange}
                ></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
            required
                type="password"
                placeholder="Password"
                value={props.password}
                onChange={props.handlePasswordChange}
                ></Form.Control>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
                Sign Up
            </Button>
            <br/>
            <Form.Label readOnly class="text-danger">{props.SubmitError}</Form.Label>
        </Form>
    );
}

export default SignUpComp;