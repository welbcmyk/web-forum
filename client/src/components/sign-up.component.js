import React, { Component }  from "react";
import axios from 'axios';
import SignUpComp from "./sub/Sign-Up.sub.component";

import backendAddress from "../helpers/backend-address";
import {authenticationService} from "../services/authentication.service";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onSubmitErrorChange = this.onSubmitErrorChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            SubmitError: ''
        }
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    onEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmitErrorChange(e) {
        this.setState({
            SubmitError: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            SubmitError: ""
        });
        
        if(!this.validateUsername()){
            this.setState({
                SubmitError: this.state.username + " is not available."
            });
            return;
        }
        if(!this.validateEmail()){
            this.setState({
                SubmitError: "Please enter an E-Mail."
            });
            return;
        }
        if(!this.validatePassword()){
            this.setState({
                SubmitError: "Please enter a Password."
            });
            return;
        }
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            date: Date.now(),
        }
        axios.post(backendAddress() + "/user/add", user)
        .then(res => {
            console.log(res.data);
            this.props.history.push("/login");
        })
        .catch(error => {
            console.log(error);
            this.setState({
                SubmitError: "Something went wrong."
            })
        })
    }

    validateUsername() {
        const isAvailable = false;
        axios.get(backendAddress() + "/username/check/" + this.state.username)
        .then(res => isAvailable = res.data.isAvailable)
        .catch(error => {
            console.log(error);
            isAvailable = false;
        })
        return this.state.username.length > 0 && isAvailable;
    }

    validatePassword() {
        return this.state.password.length > 0;
    }

    validateEmail() {
        return this.state.email.length > 0;
    }

    render() {
        return (
            <SignUpComp 
            username={this.state.username}  
            handleUsernameChange={this.onUsernameChange}
            email={this.state.email}
            handleEmailChange={this.onEmailChange}
            password={this.state.password}
            handlePasswordChange={this.onPasswordChange}
            handleSubmit={this.onSubmit}
            SubmitError={this.state.SubmitError}
            />
        );
    }
}