import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHandshake} from "@fortawesome/free-solid-svg-icons";

//Homepage to display at application startup
const Jumotron = () => {
  return (
    <div className="jumbotron" style={{backgroundColor: "#ffffff91",height: "1156px"}} >
      
      <h1 className="display-3"> <FontAwesomeIcon icon={faHandshake} />&nbsp; CL Connects Community</h1>
      
      
      <hr class="my-4" />
      <p className="lead">A Disscussion Broadcast channel for the CL Family.</p>
      <img src={'http://localhost:3000/s8.png'} alt={"not found"}/>
    </div>
  );
};

export default Jumotron;
