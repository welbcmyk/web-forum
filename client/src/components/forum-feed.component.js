import React, { Component } from "react";
import axios from 'axios';

import PostComp from "./sub/post.sub.component";
import backendAddress from "../helpers/backend-address";
import { authenticationService } from "../services/authentication.service";
import EmptyPage from "./sub/empty.sub.component";
import ForumInfo from "./sub/forum-info.sub.component";
import ForumNotFound from "./sub/ForumNotFound.sub.component";

export default class HomeFeed extends Component {
  constructor(props) {
    super(props);

    this.postList = this.postList.bind(this);
    this.editPost = this.editPost.bind(this);
    this.showPost = this.showPost.bind(this);

    this.state = {
      posts: [],
      name: "",
      id: "",
      createdDate: "",
      description: "",
      username: "",
      userid: ""
    }
  }

  componentDidMount() {
    axios.get(backendAddress() + '/forum/' + this.props.match.params.name)
    .then(response => {
      this.setState({
        userid: response.data.user,
        id: response.data._id,
        createdDate: response.data.data,
        name: response.data.name,
        description: response.data.description
      })
    })
    .catch((error) => {
      console.log(error);
    })

    axios.get(backendAddress() + '/user/' + this.state.userid)
    .then(response => {
      this.setState({
        username: response.data.username
      })
    })
    .catch((error) => {
      console.log(error);
    })

    axios.get(backendAddress() + '/posts/forum/' + this.props.match.params.name)
    .then(response => {
      this.setState({
        posts: response.data,
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  editPost(id) {
    this.props.history.push("/post/edit/" + id);
  }

  showPost(id) {
    this.props.history.push("/post/" + id);
  }

  postList() {
    return this.state.posts.map(currentPost => {
      const username = "";
      const commentCount = 0;
      axios.get(`${backendAddress()}/user/` + currentPost.user)
      .then(response => {
        username = response.data.username
      })
      .catch((error) => {
        console.log(error);
        username = "[deleted]";
      });
      axios.get(`${backendAddress()}/comments/commentCount/` + currentPost._id)
      .then(response => {
        commentCount = response.data.count;
      })
      .catch((error) => {
        console.log(error);
        commentCount = 0;
      });
      return (
        <PostComp 
        key={currentPost._id} 
        subTitle={this.state.username + " " + this.state.Name}
        date={currentPost.date} 
        title={currentPost.title}
        body={currentPost.body}
        commentCount={commentCount}
        showEdit={authenticationService.currentUserValue}
        showDelete={false}
        onPostEdit={this.editPost(currentPost._id)}
        onClickPost={this.showPost(currentPost._id)}
        />
      )
    });
  }
  
  render() {
    return (
      <>
        {this.state.name === "" ? <ForumNotFound /> : 
        <>
          <div class="container">
            <ForumInfo name={this.state.name} 
            createdDate={this.state.createdDate}
            description={this.state.description}
            username={this.state.username} />
          </div>
          <div class="container">
            {this.postList().length > 0 ? this.postList() : <EmptyPage />}
          </div>
        </>}
      </>
    );
  }
}
