import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, Form, Button } from 'react-bootstrap';

//import LoggedInNavbar from "./sub/logged-in.navbar.sub.component";
//import LoggedOutNavbar from "./sub/logged-out.navbar.sub.component";
//import SearchBar from "./sub/search-bar.sub.component";

import logo from "../images/logo1.png";

function LogIn (props) {
  return (
    <Nav.Link href="/login">
      Log In
    </Nav.Link>
  );
}

function SignUp () {
  return (
  <Nav.Link href="/signup">
      Sign Up
  </Nav.Link>
  );
}

function CreatePost () {
  return (
    <Nav.Link href="/submit">
        Create Post
    </Nav.Link>
  );
}

function Profil (props) {
  return (
    <Nav.Link href={"/user/" + props.username}>
        Profil
    </Nav.Link>
  );
}

function Settings (props) {
  return (
    <NavDropdown title="Settings" id="settings-dropdown">
      <NavDropdown.Item href="/change/email">Change Email</NavDropdown.Item>
      <NavDropdown.Item href="/change/password">Change Password</NavDropdown.Item>
    </NavDropdown>
  );
}

function SearchBar(props) {
  return (
    <Form onSubmit={props.onSearch}  inline>
      <Form.Control value={props.value}type="text" placeholder="Search" className="mr-sm-2"/>
      <Button variant="outline-success">Search</Button>
    </Form>
  );
}
export default class NavbarComp extends Component {
  render() {
    return (
      // TODO add log in check variable
      // TODO add props to searchbar
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand href="/">
            <img
              class="rounded"
              src={logo}
              width="30"
              height="30"
              alt="Forum-Web Logo"
            />
            Forum-Web
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {this.props.isLoggedIn ? <CreatePost /> : ""}
            {this.props.isLoggedIn ? <Profil username="test"/> : "" /* TODO change name */}
            {this.props.isLoggedIn ? <Settings /> : ""}
            {!this.props.isLoggedIn ? <LogIn /> : ""}
            {!this.props.isLoggedIn ? <SignUp /> : ""}
          </Nav>
          <SearchBar value={""} onSearch={ () => { return console.log()} /* TODO add xorrect function*/}/>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}