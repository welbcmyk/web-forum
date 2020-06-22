import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

function Comment(props) {
  return (
    <div>
      <span class="text-muted small">{props.userName} {props.date}</span>
      <span>{props.body}</span>
      <span>{props.ownComment ? <Link to={"/comment/edit/" + props.key} class="fa fa-pencil"></Link> : ""}</span>
    </div>
  );
}

export default Comment
