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
    this.fetchData = this.fetchData.bind(this);

    this.state = {
      posts: [],
      searchterm: "",
      gettingPosts: true,
      gettingForums: true
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("prop: "+nextProps.match.params.searchterm)
    this.setState({
      searchterm: nextProps.match.params.searchterm
    }, () => {
    this.fetchData();
    })
  }

  fetchData(){
    axios
      .get(
        backendAddress() + "/posts/search/" + this.state.searchterm
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
        backendAddress() + "/forums/search/" + this.state.searchterm
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

  componentDidMount() {
    this.setState({
      searchterm: this.props.match.params.searchterm
    }, () => {
    this.fetchData();
    });
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

  forumList() {
    return this.state.forums.map((currentForum) => {
      return (
        <ForumInfo
          name={currentForum.name}
          onClickForum={() => {this.props.history.push("/forum/"+currentForum.name)}}
        />
      );
    });
  }

  render() {
    if(this.state.gettingPosts || this.state.gettingForums) return null;
    return (
    <Tabs defaultActiveKey="posts" id="search-tab">
      <Tab eventKey="posts" title="Posts">
        {this.postList().length > 0 ? this.postList() : <EmptyPage />}
      </Tab>
      <Tab eventKey="forums" title="Forum">
        {this.forumList().length > 0 ? this.forumList() : <EmptyPage/>}
      </Tab>
    </Tabs>)
    ;
  }
}
