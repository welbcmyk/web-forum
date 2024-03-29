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
      submitError: "",
    };
  }

  forumNameArray() {
    return this.state.forums.map(currentForum => {
      return currentForum.name;
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  componentDidMount() {
    this.setState({
      userid: authenticationService.currentUserValue._id,
    });
    return axios
      .get(backendAddress() + "/forums")
      .then((response) => {
        this.setState({
          forums: response.data,
          forumid: response.data[0]._id,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {   
        if(this.props.match.params.forumName && this.forumNameArray().includes(this.props.match.params.forumName)){
          this.setState({
            forumid: this.state.forums.find(forum => forum.name == this.props.match.params.forumName)._id
          })
        }
      })
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      submitError: "",
    });
    if (!this.validateForum()) {
      this.setState({
        submitError: "No valid forum selected.",
      });
    }

    if (!this.validateTitle()) {
      this.setState({
        submitError: "Please enter a title.",
      });
    }

    if (!this.validateBody()) {
      this.setState({
        submitError: "Please enter content.",
      });
    }
    const post = {
      user: this.state.userid,
      forum: this.state.forumid,
      title: this.state.title,
      body: this.state.body,
      date: Date.now(),
    };

    axios
      .post(`${backendAddress()}/posts/add`, post)
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/forum/" + this.state.forums.find(forum => forum._id == this.state.forumid).name);
      })
      .catch((error) => {
        console.log("Error: " + error);
        this.setState({
          submitError: "Something went wrong.",
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
    return this.state.title.length > 0;
  }

  validateBody() {
    return this.state.body.length > 0;
  }

  validateForum() {
    return this.state.forumid != "";
  }

  render() {
    return (
      <EditPost
        currentForum={this.state.forumid}
        handleForumChange={this.onChangeForum}
        forums={this.state.forums}
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
