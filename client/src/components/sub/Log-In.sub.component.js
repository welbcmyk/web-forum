import React from "react";
import { Form, Button } from 'react-bootstrap';

function ForumInfo(props) {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
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
                type="password"
                placeholder="Password"
                value={props.email}
                onChange={props.handlePasswordChange}
                ></Form.Control>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
                Log In
            </Button>
            <br/>
            <Form.Label class="text-danger">{props.SubmitError}</Form.Label>
        </Form>
    );
}

export default ForumInfo;