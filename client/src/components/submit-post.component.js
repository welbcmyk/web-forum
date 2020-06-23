import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const mockupForums = [
  {
    _id: 1,
    name: "Foo1",
  },
  {
    _id: 2,
    name: "Foo2",
  },
  {
    _id: 3,
    name: "Foo3",
  }
]

export default class HomeFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post_title: "",
      post_date: "",
      post_content: "",
      post_user: "",
      post_forum: "",
      dropdownOpen: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      ""
    );
  }

  FourmsAsDropDownItems(forums) {
    return forums.map(function(forum) {
        return (<DropdownItem class="dropdown-item" href={'/forum/submit/' + forum.name} key = {forum._id}>{forum.name}</DropdownItem>);
      });
  }

  getForums() {
    // TODO change forums functions to real function which gives all forum back in a dropdown menu
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          caret
          class="btn btn-secondary input-block-level dropdown-toggle"
          type="button"
          id="dropdownForums"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          All
        </DropdownToggle>
        <DropdownMenu class="dropdown-menu" aria-labelledby="dropdownForums">
          
        </DropdownMenu>
      </Dropdown>
    );
  }
  onSubmit(e) {
    e.preventDefault();

    console.log("Post submitted:");
    console.log("User:");
    console.log("Title:");
    console.log("Content:");
    console.log("Date:");

    this.setState({
      post_title: "",
      post_date: "",
      post_content: "",
      post_user: "",
    });
  }
  onChangeTitle(e) {
    this.setState({
      post_title: e.target.value,
    });
  }
  onChangeContent(e) {
    this.setState({
      post_content: e.target.value,
    });
  }
  onChangeDate(e) {
    this.setState({
      post_date: e.target.value,
    });
  }
}
