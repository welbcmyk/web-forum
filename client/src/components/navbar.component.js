import React, { Component } from "react";
import { Navbar, Nav, Modal, NavDropdown, Form, Button } from "react-bootstrap";
import { authenticationService } from "../services/authentication.service";
import { withRouter } from "react-router-dom";
import axios from "axios";
import backendAddress from "../helpers/backend-address";

import logo from "../images/logo1.png";

function LogIn(props) {
  return <Nav.Link href="/login">Log In</Nav.Link>;
}

function SignUp() {
  return <Nav.Link href="/signup">Sign Up</Nav.Link>;
}

function CreatePost() {
  return <Nav.Link href="/submit">Create Post</Nav.Link>;
}

function CreateForum() {
  return <Nav.Link href="/create/forum">Create Forum</Nav.Link>;
}

function Profil(props) {
  return <Nav.Link href={"/user/" + props.username}>Profil</Nav.Link>;
}

function Settings(props) {
  return (
    <NavDropdown title="Settings" id="settings-dropdown">
      <NavDropdown.Item href="/change/password">
        Change Password
      </NavDropdown.Item>
      <NavDropdown.Item onClick={props.deleteAccount}>
        Delete Account
      </NavDropdown.Item>
    </NavDropdown>
  );
}

function SearchBar(props) {
  return (
    <Form onSubmit={props.onSearch} inline>
      <Form.Control
        value={props.value}
        type="text"
        placeholder="Search"
        onChange={props.onChangeSearchTerm}
        className="mr-sm-2"
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
}
class NavbarComp extends Component {
  constructor(props) {
    super(props);
    this.logUserOut = this.logUserOut.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
    this.enterSearch = this.enterSearch.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.handleCloseDeletePopUp = this.handleCloseDeletePopUp.bind(this);
    this.handleShowDeletePopUp = this.handleShowDeletePopUp.bind(this);
    this.validateSearchterm = this.validateSearchterm.bind(this);

    this.state = {
      searchTerm: "",
      showDeletePopUp: false,
    };
  }

  handleCloseDeletePopUp() {
    this.setState({
      showDeletePopUp: false,
    });
  }

  handleShowDeletePopUp() {
    this.setState({
      showDeletePopUp: true,
    });
  }

  onChangeSearchTerm(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  enterSearch(e) {
    e.preventDefault();
    if (!this.validateSearchterm()) {
      return;
    }
    this.props.history.push("/search/" + this.state.searchTerm);
  }

  validateSearchterm() {
    return this.state.searchTerm.length > 0;
  }

  loggedIn() {
    return authenticationService.currentUserValue;
  }

  logUserOut() {
    authenticationService.logout();
    this.props.history.push("/login");
  }

  deleteAccount() {
    axios
      .delete(
        backendAddress() +
          "/users/name/" +
          authenticationService.currentUserValue.username
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
    this.handleCloseDeletePopUp();
    authenticationService.logout();
    this.props.history.push("/login");
  }

  render() {
    return (
      <>
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
              {this.loggedIn() ? <CreateForum /> : ""}
              {this.loggedIn() ? <CreatePost /> : ""}
              {this.loggedIn() ? (
                <Profil
                  username={authenticationService.currentUserValue.username}
                />
              ) : (
                ""
              )}
              {this.loggedIn() ? (
                <Settings deleteAccount={this.handleShowDeletePopUp} />
              ) : (
                ""
              )}
              {this.loggedIn() ? (
                <Nav.Item onClick={this.logUserOut}>
                  <Nav.Link>Log Out</Nav.Link>
                </Nav.Item>
              ) : (
                ""
              )}
              {!this.loggedIn() ? <LogIn /> : ""}
              {!this.loggedIn() ? <SignUp /> : ""}
            </Nav>
            <SearchBar
              value={this.state.searchTerm}
              onSearch={this.enterSearch}
              onChangeSearchTerm={this.onChangeSearchTerm}
            />
          </Navbar.Collapse>
        </Navbar>
        <Modal
          show={this.state.showDeletePopUp}
          onHide={this.handleCloseDeletePopUp}
        >
          <Modal.Header closeButton>
            <Modal.Title>Deleting Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your Account?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseDeletePopUp}>
              No
            </Button>
            <Button variant="danger" onClick={this.deleteAccount}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(NavbarComp);
