import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import {Card} from "react-bootstrap";

function ForumInfo(props) {
  return (
    
    <Card>
      <Card.Body>
        <div>
          <h1>{props.name}</h1>
          <br />
          <div style={{height: "auto", width: "50rem"}}>{props.description}</div>
          <div>
            created by{" "}
            <Link class="font-italic " to={"/user/" + props.username}>
              {props.username}
            </Link>
          </div>
          <span class="font-italic text-muted"> on {props.createdDate}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ForumInfo;
