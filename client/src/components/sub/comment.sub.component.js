import React from "react";
import {Card} from "react-bootstrap";

function Comment(props) {
  // TODO add delete button
  return (
    <Card>
      <Card.Body>
        <div>
          <div class="text-muted small" onClick={props.showUser}>
            {props.userName}
          </div>
          <div class="text-muted small">
            {props.date}
          </div>
          <div style={{height:"auto", width:"50rem"}}>{props.body}</div>
          <div>
            {props.ownComment ? (
              <i onClick={props.editComment} class="fa fa-pencil"></i>
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
