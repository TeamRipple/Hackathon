import React from "react";
import { useState } from "react";
import '../components/profile.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBarsProgress, 
  faBlog,  
  faCircleCheck, 
  faHouseChimney, 
  faIdBadge, 
  faLaptopCode, 
  faPenNib, 
  faSquareEnvelope, 
  faTaxi, 
  faTruckPlane, 
  faUserTie } from "@fortawesome/free-solid-svg-icons";

//function for profile page
const Profile = ({ user }) => {
  //creating state variable for file upload
  const[file, setfile] = useState('');
  function rename(file)
  {
    const i = Number;
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
  rename(file); 
  // function for user images
  const imagefind = (i1) => 
  {
    return 'cl111'; 
  }
  //function for matching icons to tags
  const checkIcon = (i) => 
  {   
    if( i=== "All Posts"){ return faBarsProgress ;}
    if( i=== "Housing"){ return faHouseChimney ;}
    if( i=== "Travel") { return faTruckPlane ;}
    if( i=== "Technical Issues"){ return faLaptopCode;}
    if( i=== "CarPool"){ return faTaxi; }
    if( i=== "General"){ return faBlog; }
  };

  return (
    <div >
      {user && (
        <React.Fragment>
          <div className="body">
            <div className="contain4">
              <div className="card3">
                <div className="form2">
                  <div className="leftside1">
                    <img src={'http://localhost:3000/'+imagefind(user.name)+'.png'} alt={" not found"} />
                    <h2>
                      <FontAwesomeIcon icon={faUserTie}/> &nbsp; {user.username} <br/><hr/>
                      <FontAwesomeIcon icon={faIdBadge}/> &nbsp; {user.name}  <br/><hr/>
                      <FontAwesomeIcon icon={faSquareEnvelope}/>  &nbsp;   {user.email} <br/><hr/>
                    </h2>
                  </div>
                  <div className="rightside1">
                    <div className="hello2">
                      <br/>
                      <h2> <FontAwesomeIcon icon={faPenNib}/> My Interests </h2>
                      <hr/>
                      <label  className="check"  for="housing"> <FontAwesomeIcon icon={checkIcon("Housing")} /> &nbsp;Housing
                        <input type="checkbox" id="housing" name="housing" />
                        <span class="checkmark"></span>
                      </label>
                      <label  className="check"  for="travel"> <FontAwesomeIcon icon={checkIcon("Travel")} /> &nbsp;Travel
                        <input type="checkbox" id="travel" name="travel" />
                        <span class="checkmark"></span>
                      </label>
                      <label  className="check"  for="technicalissues"> <FontAwesomeIcon icon={checkIcon("Technical Issues")} /> &nbsp;Technical Issues
                        <input type="checkbox" id="technicalissues" name="technicalissues" />
                        <span class="checkmark"></span>
                      </label>
                      <label  className="check"  for="carpool"> <FontAwesomeIcon icon={checkIcon("CarPool")} /> &nbsp;Carpool
                        <input type="checkbox" id="carpool" name="carpool" />
                        <span class="checkmark"></span>
                      </label>
                      <div className="btn2">
                        <button  > Submit &nbsp;<FontAwesomeIcon icon={faCircleCheck} /> </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default Profile;   
      
      
  
  
  
   
