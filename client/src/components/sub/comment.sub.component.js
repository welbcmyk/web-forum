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
        </div>
      </Card.Body>
      <Card.Footer>
        <div>
          {props.ownComment ? (
            <i onClick={props.editComment} style={{margin: "0px 20px"}} class="fa fa-pencil  float-right"></i>
          ) : (
            null
          )}
        </div>
        <div>
          {props.ownComment ? (
            <i onClick={props.deleteComment} style={{margin: "0px 20px"}} class="fa fa-trash  float-right"></i>
          ) : (
            null
          )}
        </div>
      </Card.Footer>
    </Card>
  );
}

export default Comment;
