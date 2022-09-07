import React from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import * as userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/react-toastify.esm";
import '../components/reg.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile,faUserCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import logo1 from "../images/s8.png";
//class for react register page
class Register extends Form {
  //state variables for the inputs from the register form
  state = {
    data: { username: "", email: "", password: "", password2: "", name: "" },
    errors: { username: "", email: "", password: "", password2: "", name: "" },
  };
  //schema call for the inputs of the register page
  schema = {
    name: Joi.string().required().label("Full Name"),
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().label("Email ID"),
    password: Joi.string().required().label("Password"),
    password2: Joi.string().required().label("Confirm Password"),
  };

  //gets the current value of state value and adds it to the array of webhooks
  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      console.log(response);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/dashboard";
    } catch (ex) {
      console.log(ex.response);
      if (ex.response && ex.response.status === 400) {
        // const errors = { ...this.state.errors };
        toast.error(ex.response.data);
        // this.setState({ errors });
      }
    }
  };

  //passing event handler functions
  render() {
    const { data, errors } = this.state;
    // checking if logged in
    if (localStorage.getItem("token")) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <React.Fragment>
        <ToastContainer />       
        <div className="contain2">
          <div className="card1">
            <div className="form1">
              <div className="leftside">
                <img src={logo1} alt={" not found"}/>
                <h2><FontAwesomeIcon icon={faSmile} /> Welcome to </h2> <br/>
                <h2>CL Broadcasting Channel</h2>
              </div> 
              <div className="rightside">
                <div className="hello1">
                  <h3><FontAwesomeIcon icon={faUserPlus} /> &nbsp;Sign Up</h3>                              
                </div>
                <form onSubmit={this.handleSubmit}>
                  <Input
                    value={data.name}
                    onChange={this.handleChange}
                    label="Name"
                    name="name"
                    type="text"
                    error={errors.name}
                  />
                  <Input
                    name="username"
                    value={data.username}
                    label="Username"
                    type="text"
                    onChange={this.handleChange}
                    error={errors.username}
                  />
                  <Input
                    value={data.email}
                    onChange={this.handleChange}
                    label="Email ID"
                    type="email"
                    name="email"
                    error={errors.email}
                  />
                  <Input
                    value={data.password}
                    onChange={this.handleChange}
                    label="Password"
                    type="password"
                    name="password"
                    error={errors.password}
                  />
                  <Input
                    value={data.password2}
                    onChange={this.handleChange}
                    label="Confirm Password"
                    name="password2"
                    type="password"
                    error={errors.password2}
                  />
                  <div className="btn ">
                    <button  disabled={this.validate()}>
                      Register &nbsp;<FontAwesomeIcon icon={faUserCheck} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>      
      </React.Fragment>
    );
  }
}
export default Register;