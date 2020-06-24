import React, { Component } from "react";
import axios from "axios";

import backendAddress from "../helpers/backend-address";
import EditForum from "./sub/edit-forum.sub.component";
import { authenticationService } from "../services/authentication.service";

export default class CreateForum extends Component {
    constructor(props) {
        super(props);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.validateDescription = this.validateDescription.bind(this);
        this.validateName = this.validateName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userid: "",
            name: "",
            description: "",
            submitError: ""
        }
    }

    componentDidMount() {
        this.setState({
            userid: authenticationService.currentUserValue._id
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            submitError: ""
        });

        if(!this.validateName){
            this.setState({
                submitError: this.state.name + " is not available."
            });
            return;
        }

        if(!this.validateDescription){
            this.setState({
                submitError: "Please enter Description."
            });
            return;
        }

        const forum = {
            user: this.state.userid,
            name: this.state.name,
            description: this.state.description,
            date: Date.now()
        }

        axios.post(backendAddress() + "/forums/add", forum)
        .then(res => {
          console.log(res.data);
          this.props.history.push("/");
        })
        .catch(error => {
          console.log("Error: " + error);
          this.setState({
              SubmitError: "Something went wrong."
          });
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    validateName() {
        const isAvailable = false;
        axios.get(backendAddress() + "/check/forum/" + this.state.name)
        .then(res => isAvailable = res.data.isAvailable)
        .catch(error => {
            console.log(error);
            isAvailable = false;
        })
        return this.state.name > 0 && isAvailable;
    }

    validateDescription() {
        return this.state.description > 0;
    }
    render() {
        return (
            <EditForum
            handleSubmit={this.onSubmit}
            name={this.state.name}
            handleNameChange={this.onChangeName}
            description={this.state.description}
            handleDescriptionChange={this.onChangeDescription}
            submitBtn="Create Forum"
            SubmitError={this.state.submitError}
            />
        )
    }
}