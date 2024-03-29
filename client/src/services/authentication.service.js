import { BehaviorSubject } from "rxjs";
import axios from "axios";
import backendAddress from "../helpers/backend-address";
import _ from 'lodash';

import { handleResponse } from "../helpers";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  isLoggedIn,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(username, password) {
  const user = {
    username: username,
    password: password
  }
  return axios
    .post(
      backendAddress() + "/login",
      user
    )
    .then(handleResponse)
    .then((userDB) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("currentUser", JSON.stringify(userDB));
      currentUserSubject.next(userDB);

      return userDB;
    });
}

function isLoggedIn(userid){
  if(authenticationService.currentUserValue){
    return _.each(authenticationService.currentUserValue._id, userid);
  }
  return false;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
