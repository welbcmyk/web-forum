import React from "react";
// TODO delete all Links and refactor whole code
function Post(props) {
  return (
    <div onClick={props.onClickPost}>
      <span class="text-muted small">
        {props.subTitle} {props.date}
      </span>
      <h1>{props.title}</h1>
      <br />
      <div>{props.body}</div>
      <div class="d-flex justify-content-between">
        <div class="text-mute">{props.commentCount} Comments</div>
        <div>
          {props.showEdit ? (
            <div onClick={props.onPostEdit} class="fa fa-pencil"></div>
          ) : (
            ""
          )}
        </div>
        <div>
          {props.showDelete ? (
            <div onClick={props.onPostDelete} class="bi bi-trash"></div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
