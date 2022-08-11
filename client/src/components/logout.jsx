import React from "react"; 
import {Component } from "react";
// class for logout functionality, disconnects token and redirect to dashboard
class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    //redirect to daschboard page
    window.location = "/dashboard";
  }
  render() {
    return null;
  }
}

export default Logout;
