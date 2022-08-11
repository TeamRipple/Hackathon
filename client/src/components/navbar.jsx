import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import '../components/style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faUser,
  faFaceSmile,
  faUserPlus,
  faRightFromBracket,
  faUserLock,
  faMessage,
  faInfoCircle,
  faHandshake,
  faArrowsLeftRightToLine,
  faAt,
} from "@fortawesome/free-solid-svg-icons";

//menu list for sidebar icons and links when not logged in
const menuItems = [
  { title: "Dashboard", icon: faClipboardList, link: "/dashboard" },
  { title: "Login", icon: faUserLock, link:"/users/login" },
  { title: "Register", icon: faUserPlus,link: "/users/register" },
  { title: "Contact Form", icon:  faAt,link: "/ContactForm"},
];

//menu list for sidebar icons and links when logged in
const menuItems1 = [
  { title: "Dashboard", icon: faClipboardList, link: "/dashboard" },
  { title: "Profile", icon: faUser, link:"/profile" },
  { title: "Create Post", icon: faMessage, link:"/new-post" },
  { title: "Contact Form", icon:  faAt,link: "/ContactForm"},
  { title: "Logout", icon: faRightFromBracket,link: "/users/logout" }
];

//function for navbar and sidebar
const NavBar = ({ user }) => 
{ const [isOpen, setIsOpen] = useState(true);
 
  return (
    <div>
      <div className={cx("sidebar", { "sidebar-closed": isOpen })}>
        <br/>
        <br/>
        <button className={"sidebar__button"} onClick={() => setIsOpen(!isOpen)} >
          <FontAwesomeIcon icon={faArrowsLeftRightToLine} />
        </button>
        <ul>
          {!user && (
            <React.Fragment>
              {/* mapping to list itmes from menu */}
              {menuItems.map(item => (
                <li key={item.title}>
                  <div className={"sidebar__listItem"}>
                    <NavLink to={item.link}>
                      <FontAwesomeIcon className={"sidebar__icon"} icon={item.icon}/>
                      {/* providing animation to sidebar elements */}
                      <CSSTransition
                        in={!isOpen}
                        timeout={200}
                        classNames={"fade"}
                        unmountOnExit
                      >
                        <span>{item.title}</span>
                      </CSSTransition>
                    </NavLink>
                  </div>
                </li>
              ))}
            </React.Fragment>
          )}
                  
          {user && (
            <React.Fragment>
              {menuItems1.map(item => (
                <li key={item.title}>
                  <div className={"sidebar__listItem"}>
                    <NavLink to={item.link}>
                      <FontAwesomeIcon className={"sidebar__icon"} icon={item.icon} />
                      <CSSTransition
                        in={!isOpen}
                        timeout={200}
                        classNames={"fade"}
                        unmountOnExit
                      >
                        <span>{item.title}</span>
                      </CSSTransition>
                    </NavLink>
                  </div>
              
                </li>
            
              ))}
            </React.Fragment>
          )}
        </ul>
      </div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark   sticky-top " style={{backgroundColor: "#1e1e1ea3 "}}>
          <NavLink className="navbar-brand" to="/">
            <h2><FontAwesomeIcon icon={faHandshake} />  CL Connects</h2>
          </NavLink>
          <div className="collapse navbar-collapse row" id="navbarColor03">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link ml-2" href="https://www.cirruslabs.io/about">
                  <FontAwesomeIcon icon={faInfoCircle} />  About
                </a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {user && (
                <React.Fragment>                 
                  <li className="nav-item">
                    <h5 style={{color: "white", paddingRight:"150px"}}> <FontAwesomeIcon icon={faFaceSmile}/>  Hi {user.username}</h5>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
