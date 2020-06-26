import React, { Component } from "react";
import axios from "axios";

import PostComp from "./sub/post-by-id.sub.component";
import backendAddress from "../helpers/backend-address";
import { authenticationService } from "../services/authentication.service";
import EmptyPage from "./sub/empty.sub.component";
import ForumInfo from "./sub/forum-info.sub.component";
import ForumNotFound from "./sub/ForumNotFound.sub.component";

export default class HomeFeed extends Component {
  constructor(props) {
    super(props);

    this.postList = this.postList.bind(this);
    this.getForum = this.getForum.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getPosts = this.getPosts.bind(this);

    this.state = {
      posts: [],
      name: "",
      id: "",
      createdDate: "",
      description: "",
      username: "",
      userid: "",
      gettingData: true
    };
  }

  getForum() {
    return axios
      .get(backendAddress() + "/forum/name/" + this.props.match.params.name)
      .then((response) => {
        this.setState({
          userid: response.data.user,
          id: response.data._id,
          createdDate: response.data.date,
          name: response.data.name,
          description: response.data.description,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUser() {
    return axios
    .get(backendAddress() + "/user/" + this.state.userid)
    .then((response) => {
      this.setState({
        username: response.data.username,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getPosts(){
    return  axios
    .get(backendAddress() + "/posts/forum/" + this.props.match.params.id)
    .then((response) => {
      this.setState({
        posts: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getForum()
    .finally(() => {
      return this.getUser()
    })
    .finally(() => {
      return this.getPosts();
    })
    .finally(() => {
      this.setState({
        gettingData: false
      });
    })
  }

  postList() {
    return this.state.posts.map((currentPost) => {
      return (
        <PostComp
          id={currentPost._id}
        />
      );
    });
  }

  render() {
    if(this.state.gettingData) return null;
    return (
      <>
        {this.state.name === "" ? (
          <ForumNotFound />
        ) : (
          <>
            <div class="container">
              <ForumInfo
                name={this.state.name}
                createdDate={this.state.createdDate}
                description={this.state.description}
                username={this.state.username}
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
