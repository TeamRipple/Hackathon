import React from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import '../components/ContactForm.css';
//import for icons 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faCheck, faReply } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class ContactForm extends React.Component {  

  //this must be bound so that event handler function methods correctly update the overall component state.
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        nameError: false,
        subject: '',
        contact: '',
        email: '',
        emailError: false,
        emailError2: false,
        message: '',
        messageError: false,
        formValid: false
      };

      //binding all the function to class using constructor so they can be used
      this.handleBlur   = this.handleBlur.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleBlur1 = this.handleBlur1.bind(this);   
  }
    //Validating email for cirruslabs.io useing regex
    isValidEmail(email) {
      return /^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@cirruslabs.io$/.test(email);
    }
    
    
    
    //Focusing on Name field
    handleBlur(e) {
     
      const name = e.target.name; 
      const value = e.target.value;
  
      this.setState({ [name]: value  });
  
      if (value.length <= 0 && (name === 'name')) {
        this.setState({ nameError: true });
        toast.error('Name Error')        
      } 
      else {
        this.setState({ nameError: false });
      }
    }

     //Focusing on Email field
    handleBlur1(e) {
     
      const name1 = e.target.name; 
      const value1 = e.target.value;
  
      this.setState({ [name1]: value1  });
  
      
  
      if (value1.length <= 0 && (name1 === 'email')) {
          this.setState({ emailError: true });
          this.setState({ emailError2: false });
          toast.error('Email Error')
      } 
      else {
          this.setState({ emailError: false });
          if(this.isValidEmail(value1)) {
            this.setState({ emailError2: false });  
          } 
          else 
          {
          this.setState({ emailError2: true });  
          toast.error('Invalid Email')
          }
        } 
  
    }
    
    //triggered only when we change and focus out of the text input.
    handleChange(e) 
    {
      this.setState({ [e.target.name]: e.target.value  });
    }
  
    //submits all the field values of the form and gets the current value of state. 
    //It adds it to the array of webhooks and performs validation calls . 
    handleSubmit(e) 
    {
      const { name, email, message, nameError, emailError, emailError2, messageError, subject, contact } = this.state;
      
      this.setState({ nameError: name ? false : true });
      this.setState({ messageError: message ? false : true });
      this.setState({ emailError: email ? false : true });
      if (email && !emailError) 
      { this.setState({ emailError2: this.isValidEmail(email) ? false : true });  }
      
  
      if (name && email && message && !nameError && !emailError && !emailError2 && !messageError) 
      {
        this.setState({ formValid: true }); 

          var toemail="pranjal@cirruslabs.io"
          var eemail="pranjal.kul10@gmail.com"
          
          let data = {
              name,
              email,
              subject,
              contact,
              message,
              toemail,
              eemail
              
          }
      
          //sending the contact form details to admin via mail   
          axios.post("http://localhost:4000/mailer",data)
          .then(res=>{
              this.setState({
                  sent:true,
                },this.resetForm())
            
            }).catch(()=>{
              console.log('msg sent successfully');
              })
            
      } 
      else 
      {
        this.setState({ formValid: false });
      }

      e.preventDefault();
  }  
    

  //rendering event handler and submit functions 
    render() {  
      
      const { name, email, message, nameError, emailError, emailError2, messageError, formValid } = this.state;
  
      if(!formValid) {
        
        return (
       
              <div>
                
                <ToastContainer/>
                <div className="body">
                  <div className="contain4" style={{padding: "10px 30px 10px 30px", height: "fit-content", marginTop:"100px"}} >
                    <div className="card3" style={{padding: "10px 30px 10px 30px",height: "fit-content"}}>
                      <div className="hello2"style={{textAlign:"center"}} ><h2 style={{marginLeft:"-120px"}} > <FontAwesomeIcon icon={faEnvelope} /> Contact Form</h2>    </div>
                        <div className="r1"  >
                          <form action="/" onSubmit={(e) => this.handleSubmit(e)} encType="multipart/form-data" autoComplete="on">
                            
                            <div className="form-group1" style={{margin: "5px 30px 5px 30px", width:"90%"}}>
                              <label className="lab" >Your name<span className="text-danger">*</span></label>
                              <input name="name"  type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleChange} onBlur={this.handleBlur} />
                              { nameError
                                ? <div className="alert ">Name is a required field.</div>
                                : ''
                              }
                            </div>

                            <div className="form-group1" style={{margin: "5px 30px 5px 30px", width:"90%"}}>
                              <label className="lab" >Your email<span className="text-danger">*</span></label>
                              <input name="email"  type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleChange} onBlur={this.handleBlur1} />
                              { emailError
                                ? <div className="alert ">Email is a required field.</div>
                                : ''
                              }
                              { emailError2
                                ? <div className="alert ">Email invalid.</div>
                                : ''
                              }
                            </div>

                            <div className="form-group1" style={{margin: "5px 30px 5px 30px", width:"90%"}}>
                              <label className="lab">Subject<span className="text-danger"></span></label>
                              <input name="subject"  type="text" className="form-control" placeholder="Subject" onChange={this.handleChange} value={this.state.subject}  />
                            </div>

                            <div className="form-group1" style={{margin: "5px 30px 5px 30px", width:"90%"}}>
                              <label className="lab" >Your contact number (Optional)</label>
                              <input name="contact"  type="text" className="form-control" placeholder="Contact" onChange={this.handleChange} value={this.state.contact}  />
                            </div>

                            <div className="form-group1" style={{margin: "5px 30px 5px 30px", width:"90%"}}>
                              <label className="lab" >Let us know how can we help<span className="text-danger">*</span></label>
                              <textarea name="message" style={{borderRadius: "10px", border:"1px solid rgb(43, 40, 40)" }}  type="text" className="form-control" placeholder="Message" value={this.state.message} onChange={this.handleChange} onBlur={this.handleBlur} />
                              { messageError
                                ? <div className="alert ">Message is a required field.</div>
                                : ''
                              }
                            </div>
                    
                            <div className="text-center">
                              <button className="btn btn-primary m-3">
                                <FontAwesomeIcon icon={faCheck} /> Submit
                              </button>
                            </div>                 
                          </form>       
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
      }
      else {
         return (
          // Display after successful submission
           <div className="thankyou_details">
              <ToastContainer/>
                <div className="alert alert-success mt-3" style={{textAlign:"center", backgroundColor:"#ffffff91"}}>
                  <h2>Thank you for contacting us</h2>
                  <h2> We will get in touch with you. 🧑‍💻</h2>
                  <Link to= "/dashboard" class="btn btn-link">
                  <h2 > <FontAwesomeIcon icon={faReply} /> &nbsp; Back to Dashboard </h2>
                  </Link>
                </div>
          </div>
          )
        }
    }
  }  

  export default ContactForm;