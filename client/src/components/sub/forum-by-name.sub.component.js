import React, { Component } from "react";
import axios from "axios";

import backendAddress from "../../helpers/backend-address";
import ForumInfo from "./forum-info.sub.component";

export default class Forum extends Component {
    constructor(props) {
        super(props);
        
        this.getForum = this.getForum.bind(this);
        this.getUser = this.getUser.bind(this); 

        this.state = {
            name: "",
            id: "",
            createdDate: "",
            description: "",
            username: "",
            userid: "",
        }
    }

    getForum() {
      return axios
        .get(backendAddress() + "/forum/name/" + this.props.name)
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

    componentDidMount() {
      this.getForum()
      .finally(() => {
        return this.getUser()
      })
    }
    
    render () {
        return (
            <ForumInfo
              name={this.state.name}
              createdDate={this.state.createdDate}
              description={this.state.description}
              username={this.state.username}
            />
        );
    }
}