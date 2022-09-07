import React from "react";
import { Link, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import "../components/login.css";
import "../App.css";
import Input from "../components/common/input";
import Form from "./common/form";
import { login } from "../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUserPlus, faUserShield } from "@fortawesome/free-solid-svg-icons";
import logo1 from "../images/s8.png";
// contain data or information about the Form
class Log extends Form 
{
  // state variables for login credentials
  state = {
    data: { email: "", password: "" },
    errors: {
      email: "",
      passowrd: "",
    },
  };
  //calling schema for input data from login page  
  schema = {
    email: Joi.string().required().label("Email ID"),
    password: Joi.string().required().label("Password"),
  };

  //gets the current value of state. value and adds it to the array of webhooks . 
  doSubmit = async () => 
  {
    // call to backend 
    try 
    {
      const { data } = this.state;
      const { data: jwt } = await login(data.email, data.password);
      localStorage.setItem("token", jwt);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/users/login";
      
    } catch (ex) 
    {
      if (ex.response && ex.response.status === 400) 
      {
        toast.error("Invalid Email Or Password");
      }
    }
  };
  //passing event handler functions and rendering the login token 
  render() 
  {
    if (localStorage.getItem("token")) 
    {
      return <Redirect to="/dashboard" />;
    }
    const { data, errors } = this.state;
    return (
      
      <div>
       <ToastContainer />
        <div className="body">
          <div className="contain1">
            <div className="card">
              <div className="form">
                <div className="left-side">
                  <img src={logo1} alt={" not found"}/> 
                </div>
                <div className="right-side">
                  <div className="register">
                    <p>New User ? <Link to="/users/register">  <FontAwesomeIcon icon={faUserPlus} /> Register Here</Link></p>
                  </div>
                  <div className="hello">
                    <p><FontAwesomeIcon icon={faUserShield} />  Login </p>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <Input
                      name="email"
                      value={data.email}
                      label="Email ID"
                      onChange={this.handleChange}
                      error={errors.email}
                      type="email"
                    />
                    <Input
                      name="password"
                      value={data.password}
                      label="Password"
                      onChange={this.handleChange}
                      error={errors.password}
                      type="password"
                    />
                    <div className="text-center">
                      <button
                        className="btn btn-primary m-3"
                        disabled={this.validate()}
                      >
                        <FontAwesomeIcon icon={faRightToBracket} />  Login 
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       
    );
  }
}
export default Log;
