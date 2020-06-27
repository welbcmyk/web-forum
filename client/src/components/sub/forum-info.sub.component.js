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
        <Card.Footer>
          <span>
            { props.showEdit ? <i onClick={props.editForum} style={{margin: "0px 20px"}} class="fa fa-pencil mx-auto float-right"></i> : null}
          </span>
          <span>
            <i onClick={props.onClickPost} style={{margin: "0px 20px"}} class="fa fa-reply float-right" aria-hidden="true"></i>
          </span>
        </Card.Footer>
    </Card>
  );
}

export default ForumInfo;
