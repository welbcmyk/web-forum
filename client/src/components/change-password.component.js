import React, { Component } from "react";
import axios from "axios";

import ChangePw from "./sub/change-password.sub.component";
import {authenticationService} from "../services/authentication.service";
import backendAddress from "../helpers/backend-address";

export default class ChangePassword extends Component {
    constructor(props){
        super(props);

        this.onNewPwChange = this.onNewPwChange.bind(this);
        this.onOldPwChange = this.onOldPwChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            oldPassword: "",
            newPassword: "",
            submitError: ""
        }
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(authenticationService.currentUserValue);
        this.setState({
            submitError: ""
        })
        if(!authenticationService.currentUserValue){
            this.props.history.push("/");
            return;
        }

        const user = authenticationService.currentUserValue;
        if(user.password != this.state.oldPassword) {
            this.setState({
                submitError: "Old Password is wrong"
            });
            return;
        }

        const userDB = {
            username: user.username,
            email: user.email,
            password: this.state.newPassword
        }

        axios.post(`${backendAddress()}/user/update/${user._id}`, userDB)
        .then(res => {
            console.log("changed Password");
            this.props.history.push("/");
        })
        .catch(error => {
            console.log(error);
            this.setState({
                submitError: "Something went wrong"
            });
        })
    }

    onNewPwChange(e){
        this.setState({
            newPassword: e.target.value
        })
    }

    onOldPwChange(e) {
        this.setState({
            oldPassword: e.target.value
        })
    }

    render() {
        return(
            <ChangePw
            handleSubmit={this.onSubmit}
            oldPassword={this.state.oldPassword}
            handleOldPasswordChange={this.onOldPwChange}
            newPassword={this.state.newPassword}
            handleNewPasswordChange={this.onNewPwChange}
            SubmitError={this.state.submitError}
            />
        );
    }
}