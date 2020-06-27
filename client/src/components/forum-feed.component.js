import React, { Component } from "react";
import axios from "axios";

import PostComp from "./sub/post-by-id.sub.component";
import backendAddress from "../helpers/backend-address";
import { authenticationService } from "../services/authentication.service";
import EmptyPage from "./sub/empty.sub.component";
import ForumInfo from "./sub/forum-by-name.sub.component";
import ForumNotFound from "./sub/ForumNotFound.sub.component";

export default class ForumFeed extends Component {
  constructor(props) {
    super(props);

    this.postList = this.postList.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.getForum = this.getForum.bind(this);

    this.state = {
      posts: [],
      id: "",
      gettingPosts: true
    };
  }

  getPosts(){
    return  axios
    .get(backendAddress() + "/posts/forum/" + this.state.id)
    .then((response) => {
      console.log(response);
      this.setState({
        posts: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getForum() {
    return axios
      .get(backendAddress() + "/forum/name/" + this.props.match.params.name)
      .then((response) => {
        this.setState({
          id: response.data._id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getForum()
    .finally(() => {
      this.getPosts()
      .finally(() => {
        this.setState({
          gettingPosts: false
        });
      })
    })
  }

  postList() {
    return this.state.posts.map((currentPost) => {
      return (
        <PostComp
          id={currentPost._id}
          key={currentPost._id}
          onClickPost={() => {this.props.history.push("/post/"+currentPost._id)}}
        />
      );
    });
  }

  render() {
    if(this.state.gettingPosts) return null;
    return (
      <>
        {this.state.name === "" ? (
          <ForumNotFound />
        ) : (
          <>
            <div class="container">
              <ForumInfo
                name={this.props.match.params.name}
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
