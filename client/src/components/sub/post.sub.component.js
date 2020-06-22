import React from "react";

function Post (props) {
  return (
    <Link to={"/post/" + props.key}>
      <span class="text-muted small">{props.userName} {props.date}</span>
      <h1>{props.title}</h1>
      <br/>
      <div>{props.body}</div>
      <div class="d-flex justify-content-between">
        <div class="text-mute">{props.commentCount} Comments</div>
        <div>{props.ownComment ? <Link to={"/post/edit/" + props.key} class="fa fa-pencil"></Link> : ""}</div>
      </div>
    </Link>
  );
}

export default Post;