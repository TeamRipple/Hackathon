import React from 'react';
import { useState } from 'react';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/react-toastify.esm";
import '../components/reg.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo1 from "../images/s8.png";
import { faFile } from "@fortawesome/free-solid-svg-icons";
//function for upload file
const Upload = () => {
    const[file, setfile] = useState('');
  function rename(file)
  {
    const i= Number;
    const addZero = (i) => 
    {
      if (i < 10) 
      { i = "0" + i; }
      return i;
    };
    //for renaming uploaded file to current date & time
    let originalFileFrgs = file.split(".");
    const today = new Date();
    const fullYear = today.getFullYear();
    const month = parseInt((today.getMonth()))+1;
    const day = addZero(today.getDate());
    const Hours = today.getHours();
    const Mins = today.getMinutes();
    let fileSuffix = [day]+"-"+[month]+"-"+[fullYear].join("")+ "-"+[Hours]+ "-" +[Mins].join("");
    
    console.log(fileSuffix);
    originalFileFrgs[0] = originalFileFrgs[0]  + fileSuffix;
    let filename = originalFileFrgs.join(".");

    return (filename);
  }
  console.log(rename(file));
    return (      
      <React.Fragment>
        <ToastContainer />       
        <div className="contain2">
          <div className="card1">
            <div className="form1">
              <div className="leftside">
                <img src={logo1} alt={" not found"}/>
                
              </div> 
              <div className="rightside" style={{height:"unset"}}>
             <h2 style={{marginLeft:"70px"}}> <FontAwesomeIcon icon={faFile} /> &nbsp; File Uplaod </h2> <br/>
                <form method="POST" action="http://localhost:4000/upload" encType="multipart/form-data" >
                  <input type="file" name="file123"style={{marginTop:"50px", marginLeft:"70px"}} ></input>
                  <input type="submit" className="btn1 btn-primary " style={{marginTop:"50px", marginLeft:"140px"}}></input>
                </form>
              </div>
            </div>
          </div>
        </div>      
      </React.Fragment>
        
        
    );
};
export default Upload;