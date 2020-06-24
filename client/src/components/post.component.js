import React, { Component } from "react";
import axios from 'axios';
import { Modal, Button} from 'react-bootstrap';

import PostComp from "./sub/post.sub.component";
import backendAddress from "../helpers/backend-address";
import { authenticationService } from "../services/authentication.service";
import Comment from "./sub/comment.sub.component";
import PostNotFound from "./sub/post-not-found.sub.component";
import EmptyPage from "./sub/empty.sub.component";

export default class HomeFeed extends Component {
  constructor(props) {
    super(props);

    this.commentList = this.commentList.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.handleCloseDeletePopUp = this.handleCloseDeletePopUp.bind(this);
    this.handleShowDeletePopUp = this.handleShowDeletePopUp.bind(this);

    this.state = {
      comments: [],
      showDeletePopUp: false,
      username: "",
      userid: "",
      forumname: "",
      forumid: "",
      title: "",
      body: "",
      createdDate: "",
      id: ""
    }
  }

  componentDidMount() {
    axios.get(backendAddress() + '/post/' + this.props.match.params.id)
    .then(response => {
      this.setState({
        id: response.data._id,
        title: response.data.title,
        body: response.data.body,
        userid: response.data.user,
        forumid: response.data.forum,
        createdDate: response.data.date
      })
    })
    .catch((error) => {
      console.log(error);
    })

    axios.get(backendAddress() + "/user/" + this.state.userid)
    .then(response => {
      this.setState({
        username: response.data.username
      })
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        username: "[deleted]"
      })
    });

    axios.get(backendAddress() + "/forum/" + this.state.forumid)
    .then(response => {
      this.setState({
        forumname: response.data.name
      })
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        forumname: "[deleted]"
      })
    });

    axios.get(backendAddress() + '/comments/post/' + this.props.match.params.id)
    .then(response => {
      this.setState({
        comments: response.data,
      })
    })
  }

  editPost() {
    this.props.history.push("/edit/post/" + this.state.id);
  }

  deletePost() {
    axios.delete(backendAddress() + "/post/" + this.state.id)
    .then(response => {
        this.props.history.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleCloseDeletePopUp() {
    this.setState({
      showDeletePopUp: false
    })
  }

  handleShowDeletePopUp() {
    this.setState({
      showDeletePopUp: true
    })
  }

  commentList() {
    return this.state.comments.map(currentComment => {
      const username = "";
      axios.get(backendAddress() + "/user/" + currentComment.user)
      .then(response => {
        username = response.data.username
      })
      .catch((error) => {
        console.log(error);
        username = "[deleted]";
      });
      return (
        <Comment 
        key={currentComment._id} 
        userName={username} 
        date={currentComment.date} 
        body={currentComment.body}
        />
      )
    });
  }
  
  render() {
    return (
      <>
      {this.state.title === "" ? <PostNotFound /> : 
      <>
        <div class="container">
        <PostComp 
        key={this.state._id} 
        subTitle={this.state.username + " " + this.state.forumname} 
        date={this.state.date} 
        title={this.state.title}
        body={this.state.body}
        commentCount={this.state.comments.length}
        ownPost={authenticationService.currentUserValue}
        onPostEdit={this.editPost}
        onPostDelete={this.handleShowDeletePopUp}
        />
        </div>
        <div class="container">
          {this.commentList().length > 0 ? this.commentList() : <EmptyPage />}
        </div>
      </>}
        <Modal show={this.state.showDeletePopUp} onHide={this.handleCloseDeletePopUp}>
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