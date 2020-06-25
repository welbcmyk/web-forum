import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

function ForumInfo(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <br />
      <span>{props.description}</span>
      <span>
        created by{" "}
        <Link class="font-italic " to={"/user/" + props.username}>
          {props.username}
        </Link>
      </span>
      <span class="font-italic text-muted">on {props.createdDate}</span>
    </div>
  );
}

export default ForumInfo;
