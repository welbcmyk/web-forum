import React, { Component } from "react";
import axios from "axios";

import PostComp from "./sub/post-by-id.sub.component";
import backendAddress from "../helpers/backend-address";
import { authenticationService } from "../services/authentication.service";
import EmptyPage from "./sub/empty.sub.component";

export default class HomeFeed extends Component {
  constructor(props) {
    super(props);

    this.postList = this.postList.bind(this);

    this.state = {
      posts: [],
      gettingData: true
    };
  }

  componentDidMount() {
    axios
      .get(backendAddress() + "/posts/")
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
        })
      });
  }

  postList() {
    return this.state.posts.map((currentPost) => {
      return (
        <PostComp
          id={currentPost._id}
          onClickPost={() => {this.props.history.push("/post/"+currentPost._id)}}
        />
      );
    });
  }

  render() {
    if(this.state.gettingData) return null;
    return <>{this.postList().length > 0 ? this.postList() : <EmptyPage />}</>;
  }
}
