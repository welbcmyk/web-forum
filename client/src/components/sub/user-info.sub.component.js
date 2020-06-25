import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

function UserInfo(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <br />
      <span class="font-italic text-muted">joined on {props.joinedDate}</span>
    </div>
  );
}

export default UserInfo;
