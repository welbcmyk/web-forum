import React, { Component } from "react";
import axios from "axios";

import PostComp from "./sub/post.sub.component";
import backendAddress from "../helpers/backend-address";
import { authenticationService } from "../services/authentication.service";
import EmptyPage from "./sub/empty.sub.component";
import UserInfo from "./sub/user-info.sub.component";
import UserNotFound from "./sub/UserNotFound.sub.component";

export default class HomeFeed extends Component {
  constructor(props) {
    super(props);

    this.postList = this.postList.bind(this);

    this.state = {
      posts: [],
      username: "",
      id: "",
      joinDate: "",
      gettingData: true
    };
  }

  componentDidMount() {
    axios
      .get(backendAddress() + "/user/" + this.props.match.params.name)
      .then((response) => {
        this.setState({
          username: response.data.username,
          id: response.data._id,
          joinDate: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(backendAddress() + "/posts/user/" + this.props.match.params.name)
      .then((response) => {
        this.setState({
          posts: response.data,
          gettingData: false
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          gettingData: false
        });
      });
  }

  postList() {
    return this.state.posts.map((currentPost) => {
      return (
        <PostComp
          id={currentPost._id}
          key={currentPost._id}
        />
      );
    });
  }

  render() {
    if(this.state.gettingData) return null;
    return (
      <>
        {this.state.username === "" ? (
          <UserNotFound />
        ) : (
          <>
            <div class="container">
              <UserInfo
                name={this.state.username}
                joinedDate={this.state.joinDate}
              />
            </div>
            <div class="container">
              {this.postList().length > 0 ? this.postList() : <EmptyPage />}
            </div>
          </>
        )}
      </>
    );
  }
}
