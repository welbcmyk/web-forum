import React, { Component } from "react";
import axios from "axios";
import backendAddress from "../../helpers/backend-address";
import { withRouter } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { authenticationService } from "../../services/authentication.service";

import CommentComp from "./comment.sub.component";

class Comment extends Component {
    constructor(props){
        super(props);

        this.showUser = this.showUser.bind(this);
        this.handleCloseDeletePopUp = this.handleCloseDeletePopUp.bind(this);
        this.handleShowDeletePopUp = this.handleShowDeletePopUp.bind(this);
        this.deleteComment = this.deleteComment.bind(this);

        this.state = {
            id: "",
            userid: "",
            postid: "",
            username: "",
            date: "",
            body: "",
            showDeletePopUp: false,
        }
    }

    componentDidMount() {
        axios.get(`${backendAddress()}/comment/` + this.props.id)
        .then(response => {
            this.setState({
                id: response.data._id,
                date: response.data.date,
                body: response.data.body,
                postid: response.data.post,
                userid: response.data.user,
            })
        })
        .catch(err => console.log(err))
        .finally(() => {
            axios
            .get(`${backendAddress()}/user/` + this.state.userid)
            .then((response) => {
                this.setState({
                    username: response.data.username
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                username: "[deleted]"
                });
            });
        });
    }

    showUser(e) {
      e.stopPropagation ();
      this.props.history.push("/user/" + this.state.username);
    }

    editComment(e){
        e.stopPropagation();
        this.props.history.push("/edit/comment/" + this.state._id);
    }

    editComment(e){
        e.stopPropagation();
    }

    handleCloseDeletePopUp() {
        this.setState({
            showDeletePopUp: false,
        })
    }

    handleShowDeletePopUp() {
        this.setState({
            showDeletePopUp: true,
        })
    }

    deleteComment() {
        axios.delete(backendAddress() + "/comment/" + this.state.id)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => this.props.history.go());
    }

    render(){
        return (
            <>
                <CommentComp
                    id={this.state._id}
                    userName={this.state.username}
                    date={this.state.date}
                    body={this.state.body}
                    editComment={this.editComment}
                    showUser={this.showUser}
                    ownComment={this.state.userid == authenticationService.currentUserValue._id}
                    deleteComment={this.handleShowDeletePopUp}
                />
                <Modal
                  show={this.state.showDeletePopUp}
                  onHide={this.handleCloseDeletePopUp}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Deleting Comment</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete this Comment?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseDeletePopUp}>
                      No
                    </Button>
                    <Button variant="danger" onClick={this.deleteComment}>
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default withRouter(Comment);