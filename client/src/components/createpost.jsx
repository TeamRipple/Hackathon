import React from "react";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import Input from "./common/input";
import Form from "./common/form";
import http from "../services/httpService";
import { tagsEndPoint } from "../config.json";
import { createpost } from "../services/postCreateService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faMessage,faCircleCheck } from "@fortawesome/free-solid-svg-icons";

class NewPost extends Form {
  // creating state variables for data, errors and tags
  state = 
  {
    data: { title: "", description: "", tags: [] },
    errors: { title: "", description: "", tags: [] },
    tags: [],
  };
  // calling post schema for new post
  schema = 
  {
    title: Joi.string().required().min(5).label("Title"),
    description: Joi.string().required().min(3).label("Description"),
    tags: Joi.array(),
  };
  // to handle state change of 'Related Tags' (checkboxes)
  handleTagChange = (tagID) => {
    console.log("hello");
    let data = this.state.data;
    const newtags = data.tags;
    const index = newtags.indexOf(tagID);
    if (index === -1) newtags.push(tagID);
    else newtags.splice(index, 1);
    data = {
      title: data.title,
      description: data.description,
      tags: newtags,
    };
    console.log(data);
    this.setState({ data });
  };
// Mounts for smaller components
  async componentDidMount() {
    let tags = await http.get(tagsEndPoint);
    try {
      this.setState({ tags: tags.data });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Post Validation Failed!");
      }
    }
  }
// Handle submission of data and redirection to 'dashboard' after backend call
  doSubmit = async () => {
    try {
      const { data } = this.state;
      console.log(data);
      const { response } = await createpost(data);
      console.log(response);
      window.location = "/dashboard";
    } catch (ex) {}
  };
  
  render() {
    //calling constructor for webhooks via class
    const { data, errors, tags } = this.state;
    return (
      <React.Fragment>
         <ToastContainer /> {/*Display errors as toasts */}
          
          <div className="container-lg" >
            <h1 className="text-center m-2"> Create a New Post  <FontAwesomeIcon icon={faMessage} /> </h1>
            <div className="container m-4 p-4 rounded" style={{ backgroundColor: "#ffffff91" }}          >
              <form method="POST" action="http://localhost:4000/upload" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            
                <Input
                    value={data.title}
                    onChange={this.handleChange}
                    label=  "Title"
                    name="title"
                    type="text"
                    error={errors.title}
                />
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    value={data.description}
                    onChange={this.handleChange}
                    name="description"
                    type="description"
                    id="description"
                    className="form-control"
                  />
                  {errors.description && (
                    <div className="alert-info">{errors.description}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Related Tags</label>
                  <br />
                  {tags.map((tag) => (
                    <React.Fragment>
                      <label className="" style={{marginLeft:"60px"}}>
                       {tag.name}
                      </label>
                      <input
                        key={tag._id}
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => this.handleTagChange(tag._id)}
                        style={{width:"18px", height: "18px",marginLeft:"5px"}}
                      />
                    
                      
                    </React.Fragment>
                  ))}
                
                  {errors.tags && <div className="alert-info">{errors.tags}</div>}
                </div>
                <div className="text-center">
                  <button className="btn btn-primary mt-4" disabled={this.validate()} > 
                    <FontAwesomeIcon icon={faCircleCheck} /> 
                    Submit 
                  </button>
                </div>
              </form>
           </div>
         </div>
        
      </React.Fragment>
    );
  }
}
export default NewPost;
