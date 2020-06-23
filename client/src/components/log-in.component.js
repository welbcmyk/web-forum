import React, { Component } from "react";
import LogInComp from "./sub/Log-In.sub.component";
import { authenticationService } from "../services/authentication.service";

export default class LogIn extends Component {
    constructor(props){
        super(props);

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeSubmitError = this.onChangeSubmitError.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            SubmitError: '',
        }
    }

    onChangeSubmitError(e) {
        this.setState({
            SubmitError: e.target.value
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            SubmitError: ""
        });
        if(!this.validateUsername()){
            this.setState({
                SubmitError: "Please enter a Username."
            });
            return;
        }
        if(!this.validatePassword()){
            this.setState({
                SubmitError: "Please enter a Password."
            });
            return;
        }
        authenticationService.login(this.state.username, this.state.password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => {
                    this.setState({
                        SubmitError: "Email or Password are incorrect."
                    });
                }
            );

    }

    validateUsername() {
        return this.state.username.length > 0;
    }

    validatePassword() {
        return this.state.password.length > 0;
    }

  render() {
    return (
        <LogInComp 
            username={this.state.username}
            password={this.state.password}
            SubmitError={this.state.SubmitError}
            handlePasswordChange={this.onChangePassword}
            handleUsernameChange={this.onChangeUsername}
            handleSubmit={this.onSubmit}
        />
    );
  }
}