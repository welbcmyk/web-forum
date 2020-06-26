import React, {Component} from "react";
import axios from "axios";
import {Modal, Button} from "react-bootstrap";
import { withRouter } from "react-router-dom";

import Post from "./post.sub.component";
import backendAddress from "../../helpers/backend-address";
import {authenticationService} from "../../services/authentication.service";

class PostId extends Component {
    constructor(props) {
        super(props);
        this.editPost = this.editPost.bind(this);
        this.showPost = this.showPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.handleCloseDeletePopUp = this.handleCloseDeletePopUp.bind(this);
        this.handleShowDeletePopUp = this.handleShowDeletePopUp.bind(this);

        this.state = {
            id: props.id,
            userid: "",
            title: "",
            body: "",
            forumid: "",
            date: "",
            forumName: "",
            username: "",
            commentCount: 0,
            showDeletePopUp: false,
        }
    }

    componentDidMount() {
        axios.get(`${backendAddress()}/post/${this.props.id}`)
        .then(response => {
            this.setState({
                userid: response.data.user,
                title: response.data.title,
                body: response.data.body,
                forumid: response.data.forum,
                date: response.data.date,
            })
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            axios
              .get(`${backendAddress()}/users/` + this.state.userid)
              .then((response) => {
                  this.setState({
                      username: response.data.username,
                  })
              })
              .catch((error) => {
                console.log(error);
                this.setState({
                    username: "[deleted]",
                })
              });
            axios
              .get(`${backendAddress()}/forums/` + this.state.forumid)
              .then((response) => {
                this.setState({
                    forumName: response.data.name,
                })
              })
              .catch((error) => {
                console.log(error);
                this.setState({
                    forumName: "[deleted]",
                })
              });
            axios
              .get(`${backendAddress()}/comments/commentCount/` + this.state._id)
              .then((response) => {
                this.setState({
                    commentCount: response.data.count,
                })
              })
              .catch((error) => {
                console.log(error);
                this.setState({
                    commentCount: 0,
                })
              });
        })
    }

    editPost(id) {
      this.props.history.push("/post/edit/" + id);
    }
  
    showPost(id) {
      this.props.history.push("/post/" + id);
    }
  
    deletePost() {
      axios
        .delete(`${backendAddress()}/post/` + this.state.id)
        .then((response) => {
          this.props.history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    handleCloseDeletePopUp() {
      this.setState({
        showDeletePopUp: false,
      });
    }
  
    handleShowDeletePopUp() {
      this.setState({
        showDeletePopUp: true,
      });
    }

    render() {
        return (
            <>
                <Post
                id={this.state.id}
                subTitle={this.state.username + " " + this.state.forumName}
                date={this.state.date}
                title={this.state.title}
                body={this.state.body}
                commentCount={this.state.commentCount}
                showEdit={authenticationService.currentUserValue}
                showDelete={authenticationService.currentUserValue}
                onPostEdit={this.editPost}
                onClickPost={this.showPost}
                />
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

export default withRouter(PostId);