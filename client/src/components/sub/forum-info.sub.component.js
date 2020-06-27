import React from "react";
import {Card} from "react-bootstrap";

function ForumInfo(props) {
  return (
    
    <Card onClick={props.onClickForum}>
      <Card.Body>
        <div>
          <h1>{props.name}</h1>
          <br />
          <div style={{height: "auto", width: "50rem"}}>{props.description}</div>
          <div>
            created by{" "}
            <span class="font-italic " onClick={props.showUser}>
              {props.username}
            </span>
          </div>
          <span class="font-italic text-muted"> on {props.createdDate}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ForumInfo;
