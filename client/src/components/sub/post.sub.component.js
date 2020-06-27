import React from "react";
import "../../App.css";
import {Card} from "react-bootstrap";
function Post(props) {
  return (
    <Card>
      <Card.Body>
        <div onClick={props.onClickPost}>
          <span class="text-muted small">
            {props.subTitle}
          </span>
          <div class="text-muted small">
            {props.date}
          </div>
          <h1>{props.title}</h1>
          <div style={{height: "auto", width: "50rem"}}>{props.body}</div>
          <div class="d-flex justify-content-between">
            <div class="text-mute">{props.commentCount} Comments</div>
            <span><i onClick={props.commentPost} class="fa fa-reply" aria-hidden="true"></i></span>
            <span>
              {props.showEdit ? (
                <div onClick={props.onPostEdit} class="fa fa-pencil"></div>
              ) : (
                ""
              )}
            </span>
            <span>
              {props.showDelete ? (
                <div onClick={props.onPostDelete} class="bi bi-trash"></div>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Post;
