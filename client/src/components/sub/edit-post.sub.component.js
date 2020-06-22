import React from "react";
import { Form, Button } from 'react-bootstrap';

const forums = (forums) => {
    return forums.map((forum) => {
        return(
            <option key={forum._id}>{forum.name}</option>
        )
    });
}

function EditPost(props){
    return(
        <Form class="card container" onSubmit={props.handleSubmit}>
          <br />
          <Form.Group>
            <Form.Label>Forum</Form.Label>
            <Form.Control
              as="select"
              value={props.currentForum}
              onChange={props.handleForumChange}
            >{forums(props.forums)}</Form.Control>
          </Form.Group>
          <br/>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              rows="2"
              onChange={props.handleHeaderChange}
              value={props.header}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Control
            type="text"
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

export default EditPost;