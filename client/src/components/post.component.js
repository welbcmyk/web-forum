import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

import PostComp from "./sub/post-by-id.sub.component";
import backendAddress from "../helpers/backend-address";
import { authenticationService } from "../services/authentication.service";
import Comment from "./sub/comment-by-id.sub.component";
import PostNotFound from "./sub/post-not-found.sub.component";

export default class HomeFeed extends Component {
  constructor(props) {
    super(props);

    this.commentList = this.commentList.bind(this);

    this.state = {
      comments: [],
      id: "",
      gettingData: true
    };
  }

  componentDidMount() {

    axios
      .get(backendAddress() + "/comments/post/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          comments: response.data,
          gettingData: false
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          gettingData: false
        });
      });
  }

  commentList() {
    return this.state.comments.map((currentComment) => {
      return (
        <Comment
          id={currentComment._id}
          key={currentComment._id}
        />
      );
    })
    .reverse();
  }

  render() {
    if(this.state.gettingData) return null;
    return (
      <>
        {this.state.title === "" ? (
          <PostNotFound />
        ) : (
          <>
            <div class="container">
              <PostComp
                id={this.props.match.params.id}
              />
            </div>
            <div class="container">
              {this.commentList().length > 0 ? (
                this.commentList()
              ) : (
                <></>
              )}
            </div>
          </>
        )}
        <Modal
          show={this.state.showDeletePopUp}
          onHide={this.handleCloseDeletePopUp}
        >
          <Modal.Header closeButton>
            <Modal.Title>Deleting Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this Post?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseDeletePopUp}>
              No
            </Button>
            <Button variant="danger" onClick={this.deletePost}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
