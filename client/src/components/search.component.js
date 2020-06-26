import React, { Component } from "react";
import axios from "axios";

import PostComp from "./sub/post-by-id.sub.component";
import backendAddress from "../helpers/backend-address";
import { authenticationService } from "../services/authentication.service";
import EmptyPage from "./sub/empty.sub.component";
import { Tabs, Tab } from "react-bootstrap";
import ForumInfo from "./sub/forum-by-name.sub.component";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.postList = this.postList.bind(this);

    this.state = {
      posts: [],
      gettingPosts: true,
      gettingForums: true
    };
  }

  componentDidMount() {
    axios
      .get(
        backendAddress() + "/posts/search/" + this.props.match.params.searchterm
      )
      .then((response) => {
        this.setState({
          posts: response.data,
          gettingPosts: false
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          gettingPosts: false
        });
      });
      axios
        .get(
          backendAddress() + "/forums/search/" + this.props.match.params.searchterm
        )
        .then((response) => {
          this.setState({
            forums: response.data,
            gettingForums: false
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            gettingForums: false
          });
        });
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

  forumList() {
    return this.state.forums.map((currentForum) => {
      return (
        <ForumInfo
          name={currentForum.name}
        />
      );
    });
  }

  render() {
    if(this.state.gettingPosts) return null;
    return (
    <Tabs >
      <Tab eventKey="posts" title="Posts">
        {this.postList().length > 0 ? this.postList() : <EmptyPage />}
      </Tab>
      <Tab>
        {this.forumList().length > 0 ? this.forumList() : <EmptyPage/>}
      </Tab>
    </Tabs>)
    ;
  }
}
