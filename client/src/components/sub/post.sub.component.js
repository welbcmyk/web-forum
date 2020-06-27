import React from "react";
import "../../App.css";
import {Card} from "react-bootstrap";
function Post(props) {
  return (
    <Card>
      <Card.Body>
        <div onClick={props.onClickPost}>
          <span class="text-muted small" onClick={props.showUser}>
            {props.username}
          </span>
          <span class="text-muted small">
            {" "}
          </span>
          <span class="text-muted small" onClick={props.showForum}>
            {props.forumName}
          </span>
          <div class="text-muted small">
            {(new Date(props.date)).toLocaleDateString()}
          </div>
          <h1>{props.title}</h1>
          <div style={{height: "auto", width: "50rem"}}>{props.body}</div>
          <div class="d-flex justify-content-between">
            <div class="text-mute">{props.commentCount} Comments</div>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <span>
          {props.showEdit ? (
            <i onClick={props.onPostEdit} style={{margin: "0px 20px"}} class="fa fa-pencil float-right"></i>
          ) : (
            ""
          )}
        </span>
        <span>
          {props.showDelete ? (
            <i onClick={props.onPostDelete} style={{margin: "0px 20px"}} class="fa fa-trash float-right"></i>
          ) : (
            ""
          )}
        </span>
        <span>
          <i onClick={props.commentPost} style={{margin: "0px 20px"}} class="fa fa-reply float-right" aria-hidden="true"></i>
        </span>
      </Card.Footer>
    </Card>
  );
}

export default Post;
