import React from "react";
import {Card} from "react-bootstrap";

function UserInfo(props) {
  return (
    <Card>
      <Card.Body>
        <div>
          <h1 style={{height: "auto", width: "50rem"}}>{props.name}</h1>
          <br />
          <span class="font-italic text-muted">joined on {(new Date(props.joinedDate)).toLocaleDateString()}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserInfo;
