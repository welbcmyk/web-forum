import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import {Card} from "react-bootstrap";

function Comment(props) {
  // TODO add delete button
  return (
    <Card>
      <Card.Body>
        <div>
          <div class="text-muted small">
            {props.userName} {props.date}
          </div>
          <div style={{height:"auto", width:"50rem"}}>{props.body}</div>
          <div>
            {props.ownComment ? (
              <Link to={"/comment/edit/" + props.key} class="fa fa-pencil"></Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Comment;
