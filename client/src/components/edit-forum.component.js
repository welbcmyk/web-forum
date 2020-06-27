import React, { Component } from "react";
import axios from "axios";
import _ from 'lodash';

import backendAddress from "../helpers/backend-address";
import EditForum from "./sub/edit-forum.sub.component";
import { authenticationService } from "../services/authentication.service";

export default class EditForumPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.validateDescription = this.validateDescription.bind(this);
    this.validateName = this.validateName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.invalidRequest = this.invalidRequest.bind(this);

    this.state = {
      userid: "",
      forumid: "",
      name: "",
      description: "",
      submitError: "",
      oldname: "",
      validForumName: false,
    };
  }

  invalidRequest() {
    /*this.props.history.push("/");*/
    this.setState({
      submitError: "Permission denied",
    });
  }

  componentDidMount() {
    axios
      .get(`${backendAddress()}/forums/name/` + this.props.match.params.name)
      .then((res) => {
        if (authenticationService.currentUserValue._id != res.data.user) {
          this.invalidRequest();
        }
        this.setState({
          userid: res.data.user,
          name: res.data.name,
          description: res.data.description,
          forumid: res.data._id,
          oldname: res.data.name,
        });
      })
      .catch((error) => {
        console.log(error);
        this.invalidRequest();
      });
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({
      submitError: "",
    });
    if (authenticationService.currentUserValue._id != this.state.userid) {
      this.invalidRequest();
      return;
    }

    this.validateName().finally(() => {
      if (!this.state.validForumName) {
        this.setState({
          submitError: this.state.name + " is not available.",
        });
        return;
      }

      if (!this.validateDescription) {
        this.setState({
          submitError: "Please enter Description.",
        });
        return;
      }

      const forum = {
        user: this.state.userid,
        name: this.state.name,
        description: this.state.description,
      };

      axios
        .post(`${backendAddress()}/forums/update/` + this.state.forumid, forum)
        .then((res) => {
          console.log(res.data);
          this.props.history.push("/forum/" + this.state.name);
        })
        .catch((error) => {
          console.log("Error: " + error);
          this.setState({
            SubmitError: "Something went wrong.",
          });
        });
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  async validateName() {
    var isAvailable = false;
    return axios
      .get(`${backendAddress()}/forums/check/` + this.state.name)
      .then((res) => (isAvailable = res.data.isAvailable))
      .catch((error) => {
        console.log(error);
        isAvailable = false;
      })
      .finally(() => {
        this.setState({
          validForumName: (this.state.name.length > 0 && isAvailable) || _.isEqual(this.state.name,this.state.oldname),
        });
      });
  }

  validateDescription() {
    return this.state.description.length > 0;
  }
  render() {
    return (
      <EditForum
        handleSubmit={this.onSubmit}
        name={this.state.name}
        handleNameChange={this.onChangeName}
        description={this.state.description}
        handleDescriptionChange={this.onChangeDescription}
        submitBtn="Update Forum"
        SubmitError={this.state.submitError}
      />
    );
  }
}
