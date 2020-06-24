import React, { Component } from "react";
import axios from "axios";

import backendAddress from "../helpers/backend-address";
import EditComment from "./sub/edit-comment.sub.component";
import { authenticationService } from "../services/authentication.service";

export default class EditCommentPage extends Component {
    constructor(props){
        super(props);

        this.onChangeBody = this.onChangeBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateBody = this.validateBody.bind(this);
        this.invalidRequest = this.invalidRequest.bind(this);

        this.state = {
            body: "",
            userid: "",
            postid: "",
            submitError: "",
            commentid: ""
        }
    }

    invalidRequest() {
        /*this.props.history.push("/");*/
        this.setState({
            submitError: "Permission denied"
        })
    }

    componentDidMount() {
        axios.get(backendAddress() + "/comments/" + this.props.match.params.id)
        .then(res => {
            if(authenticationService.currentUserValue._id != res.data.user) {
                this.invalidRequest();
            }
            this.setState({
                userid: res.data.user,
                body: res.data.body,
                postid: res.data.post,
                commentid: res.data._id
            })
        })
        .catch(error => {
            console.log(error);
            this.invalidRequest();
        })
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            submitError: ""
        });
        if(authenticationService.currentUserValue._id != this.state.userid) {
            this.invalidRequest();
        }

        if(!this.validateBody) {
            this.setState({
                submitError: "Please enter something."
            });
            return;
        }

        const comment = {
            user: this.state.userid,
            body: this.state.body,
            post: this.state.postid
        }

        axios.post(backendAddress() + "/comments/update/" + this.state.commentid, comment)
        .then(res => {
            console.log(res.data);
            this.props.history.push("/");
        })
        .catch(error => {
            console.log(error);
            this.setState({
                submitError: "Something went wrong"
            })
        });
    }

    onChangeBody(e) {
        this.setState({
            body: e.target.value
        })
    }

    validateBody() {
        return this.state.body > 0;
    }

    render() {
        return (
            <EditComment
            handleSubmit={this.onSubmit}
            body={this.state.body}
            handleBodyChange={this.onChangeBody}
            submitBtn="Update Comment"
            SubmitError={this.state.body.submitError}
            />
        )
    }
}