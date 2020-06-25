import React, { Component } from "react";
import axios from "axios";

import backendAddress from "../helpers/backend-address";
import EditComment from "./sub/edit-comment.sub.component";
import { authenticationService } from "../services/authentication.service";

export default class CreateComment extends Component {
    constructor(props){
        super(props);

        this.onChangeBody = this.onChangeBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateBody = this.validateBody.bind(this);

        this.state = {
            body: "",
            userid: "",
            postid: "",
            submitError: ""
        }
    }

    componentDidMount() {
        this.setState({
            userid: authenticationService.currentUserValue._id,
            postid: this.props.match.params.id
        })
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            submitError: ""
        })

        if(!this.validateBody) {
            this.setState({
                submitError: "Please enter something."
            });
            return;
        }

        const comment = {
            user: this.state.userid,
            body: this.state.body,
            post: this.state.postid,
            date: Date.now()
        }

        axios.post( `${backendAddress()}/comments/add`, comment)
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
            submitBtn="Create Comment"
            SubmitError={this.state.body.submitError}
            />
        )
    }
}