import React, { Component }  from "react";
import axios from 'axios';
import SignUpComp from "./sub/Sign-Up.sub.component";

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
                SubmitError: "Please enter a Username."
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
        console.log(user); //TODO send to backend
        this.props.history.push("/");
    }

    validateUsername() {
        return this.state.username.length > 0;
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