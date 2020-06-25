import React, { Component } from "react";
import axios from "axios";

import EditPost from "./sub/edit-post.sub.component";
import backendAddress from "../helpers/backend-address";
import { authenticationService } from "../services";

export default class SubmitPost extends Component {
  constructor(props) {
    super(props);
    
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onChangeForum = this.onChangeForum.bind(this);
    this.toggle = this.toggle.bind(this);
    this.validateTitle = this.validateTitle.bind(this);
    this.validateBody = this.validateBody.bind(this);
    this.validateForum = this.validateForum.bind(this);

    this.state = {
      forums: [],
      title: "",
      body: "",
      userid: "",
      forumid: "",
      dropdownOpen: false,
      submitError: ""
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  componentDidMount() {
    return (
      axios.get(backendAddress() + '/forums')
      .then(response => {
        this.setState({
          forums: response.data,
        })
      })
      .catch((error) => {
        console.log(error);
      })
    );
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
        submitError: ""
    });
    if(!this.validateForum()){
      this.setState({
        submitError: "No valid forum selected."
      })
    }

    if(!this.validateTitle()){
      this.setState({
        submitError: "Please enter a title."
      })
    }

    if(!this.validateBody()){
      this.setState({
        submitError: "Please enter content."
      })
    }
    const post = {
      user: this.state.userid,
      forum: this.state.forumid,
      title: this.state.title,
      body: this.state.body,
      date: Date.now()
    }

    axios.post(`${backendAddress()}/posts/add`, post)
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

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeBody(e) {
    this.setState({
      body: e.target.value,
    });
  }

  onChangeForum(e) {
    this.setState({
      forumid: e.target.value,
    });
  }

  validateTitle() {
    return this.state.title > 0;
  }

  validateBody() {
    return this.state.body > 0;
  }
  
  validateForum() {
    return this.state.forumid != "";
  }

  render() {
    return (
      <EditPost
      currentForum={this.state.forumid}
      handleForumChange={this.onChangeForum}
      forums={this.state.forms}
      handleHeaderChange={this.onChangeTitle}
      header={this.state.title}
      handleBodyChange={this.onChangeBody}
      body={this.state.body}
      submitBtn="Create Post"
      SubmitError={this.state.submitError}
      handleSubmit={this.onSubmit}
      />
    );
  }
}
