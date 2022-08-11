import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress, faBlog, faHouseChimney, faLaptopCode, faStar, faTaxi, faTruckPlane,  } from "@fortawesome/free-solid-svg-icons";

//function to list and handle selection of tags 
const ListGroup = (props) => {
  const { items, selectedTag, onTagSelect } = props;
  //matching icon to tags
  const checkIcon = (i) => 
  {   
    if( i=== "All Posts"){ return faBarsProgress ;}
    if( i=== "Housing"){ return faHouseChimney ;}
    if(i=== "Travel"){ return faTruckPlane ;}
    if( i=== "Technical Issues"){ return faLaptopCode;}
    if( i=== "CarPool"){ return faTaxi; }
    if( i=== "General"){ return faBlog; }
    else{ return faStar; }
  };
  
  return (
    <>
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item._id}
            className={ item === selectedTag ? "list-group-item active" : "list-group-item" }
            onClick={() => onTagSelect(item)}
          >
          <FontAwesomeIcon icon={checkIcon(item.name)} /> &nbsp;  {item.name}
          </li>
        ))}
        
      </ul>
    </>
  );
};

ListGroup.defaultProps = 
{
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
