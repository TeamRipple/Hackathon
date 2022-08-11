import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faClockRotateLeft, faEye, faFontAwesome, faPenToSquare, faThumbsUp, faUser,  } from "@fortawesome/free-solid-svg-icons";
//React page for listing details on dashboard and linking to postpage
const Posts = (props) => 
{
  const { posts } = props;
  return (
    <div className="list-group" >
      {posts.map((post) => (
        <Link
          className="list-group-item list-group-item-action flex-column align-items-start"
          to={`/post/${post._id}`}
        >
          <div className="d-flex w-100 justify-content-between" key={post._id}>
            <h5 className="mb-1"><FontAwesomeIcon icon={faFontAwesome}/> &nbsp; {post.title}</h5>
          </div>
                   
          <FontAwesomeIcon icon={faPenToSquare}/><small className="overflow-hidden"> &nbsp;{post.description}</small>
          <div className="mt-1">
            <FontAwesomeIcon icon={faCaretRight}/> &nbsp; Related Topics:
            {post.tags.map((tag) => (
              <span className="badge badge-secondary m-1 p-2">{tag.name}</span>
            ))}
            <h6 className="mt-2">
              <FontAwesomeIcon icon={faThumbsUp}/>  {post.upvotes.length}  &nbsp; | &nbsp; <FontAwesomeIcon icon={faEye}/> {post.views} 
            </h6> &nbsp; <small style={{marginLeft: "565px"}}><FontAwesomeIcon icon={faUser}/> {post.author.name}</small>
           
            &nbsp;&nbsp;&nbsp;&nbsp;<small><FontAwesomeIcon icon={faClockRotateLeft}/> <Moment fromNow>{post.time}</Moment></small>
          </div>

        </Link>
      ))}
    </div>
  );
};

export default Posts;
