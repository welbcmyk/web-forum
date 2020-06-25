import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

function Comment(props) {
  // TODO add delete button
  return (
    <div>
      <div class="text-muted small">
        {props.userName} {props.date}
      </div>
      <div>{props.body}</div>
      <div>
        {props.ownComment ? (
          <Link to={"/comment/edit/" + props.key} class="fa fa-pencil"></Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Comment;
