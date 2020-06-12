import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
export default class HomeFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post_title: "",
      post_date: "",
      post_content: "",
      post_user: "",
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
      <div class="card container">
        <br />
        <div class="input-group row">
          <div class="col-md-1"></div>
          <input
            type="text"
            class="form-control rounded col-md-6"
            placeholder="Search for Forum"
            aria-label="Forum"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <br />
        <div class="row">
          <div class="col-md-1"></div>
          <div class="dropdown col-md">{this.forums()}</div>
          <div class="col-md"></div>
          <div class="col-md"></div>
        </div>
        <br />
        <div class="form-group row">
          <div class="col-md-1"></div>
          <input
            class="form-control col-md-8"
            placeholder="Header"
            rows="2"
            id="post_header"
          ></input>
        </div>
        <br />
        <div class="form-group row">
          <div class="col-md-1"></div>
          <textarea
            class="form-control col-md-10"
            placeholder="Body"
            rows="5"
            id="post_body"
          ></textarea>
        </div>
        <br />
      </div>
    );
  }

  forums() {
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
          <DropdownItem class="dropdown-item" href="/forum/forum1/submit">
            Forum 1
          </DropdownItem>
          <DropdownItem class="dropdown-item" href="/forum/forum2/submit">
            Forum 2
          </DropdownItem>
          <DropdownItem class="dropdown-item" href="/forum/forum3/submit">
            Forum 3
          </DropdownItem>
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
