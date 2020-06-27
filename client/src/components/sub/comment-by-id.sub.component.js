import React, { Component } from "react";
import axios from "axios";
import backendAddress from "../../helpers/backend-address";
import { withRouter } from "react-router-dom";

import CommentComp from "./comment.sub.component";

class Comment extends Component {
    constructor(props){
        super(props);

        this.showUser = this.showUser.bind(this);
        this.state = {
            id: "",
            userid: "",
            postid: "",
            username: "",
            date: "",
            body: ""
        }
    }

    componentDidMount() {
        axios.get(`${backendAddress()}/comment/` + this.props.id)
        .then(response => {
            this.setState({
                id: response.data._id,
                date: response.data.date,
                body: response.data.body,
                postid: response.data.post,
                userid: response.data.user,
            })
        })
        .catch(err => console.log(err))
        .finally(() => {
            axios
            .get(`${backendAddress()}/user/` + this.state.userid)
            .then((response) => {
                this.setState({
                    username: response.data.username
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                username: "[deleted]"
                });
            });
        });
    }

    showUser(e) {
      e.stopPropagation ();
      this.props.history.push("/user/" + this.state.username);
    }

    render(){
        return (
          <CommentComp
            id={this.state._id}
            userName={this.state.username}
            date={this.state.date}
            body={this.state.body}
            editComment={() => this.props.history.push("/comment/edit/" + this.state._id)}
            showUser={this.showUser}
          />
        );
    }
}

export default withRouter(Comment);