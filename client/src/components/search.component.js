import React, { Component } from "react";
import axios from 'axios';

import PostComp from "./sub/post.sub.component";
import backendAddress from "../helpers/backend-address";
import { authenticationService } from "../services/authentication.service";
import EmptyPage from "./sub/empty.sub.component";

export default class Search extends Component {
    constructor(props) {
      super(props);
  
      this.postList = this.postList.bind(this);
      this.editPost = this.editPost.bind(this);
      this.showPost = this.showPost.bind(this);
  
      this.state = {
        posts: []
      }
    }

    componentDidMount() {
        axios.get(backendAddress() + '/posts/search/' + this.props.match.params.searchterm)
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
          const forumName = "";
          const commentCount = 0;
          axios.get(`${backendAddress()}/user/` + currentPost.user)
          .then(response => {
            username = response.data.username
          })
          .catch((error) => {
            console.log(error);
            username = "[deleted]";
          });
          axios.get(`${backendAddress()}/forum/` + currentPost.forum)
          .then(response => {
            forumName = response.data.name
          })
          .catch((error) => {
            console.log(error);
            forumName = "[deleted]";
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
            subTitle={username + " " + forumName}
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
            {this.postList().length > 0 ? this.postList() : <EmptyPage />}
          </>
        );
      }
}