const multer = require( "multer");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const users = require("./routes/users");
const posts = require("./routes/posts");
const tags = require("./routes/tags");
const replies = require("./routes/replies");
const nodemailer = require('nodemailer');
const app = express();

var addZero = require('add-zero');
//check for jwt key validation
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: JwtPrivateKey not defined");
  process.exit(1);
}

//mongo url for connection to local database
let mongoDB = "mongodb://127.0.0.1/forum";

//mongo code for connection to database
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("could not connect to mongoDB"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));

app.get("/", (req, res) => {
  res.send("request successfully sent!");
});

//linking all backend functions
app.use("/users", users);
app.use("/posts", posts);
app.use("/tags", tags);
app.use("/reply", replies);

//assigning port number 
const port = process.PORT || 4000 ;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//connecting to nodemailer for mailing features 
app.use(bodyParser.urlencoded({extended: true}));
app.post('/mailer',(req,res)=>{
  let data = req.body
  let smtpTransport = nodemailer.createTransport({
      service:'Gmail',
      port:465,
      auth:{
          user:'cl.automailing@gmail.com',
          pass:'wimbgzzglzzxfqpz'
      }
  });

  console.log(data);
  const today = new Date();
  //email body
  let mailOptions=
  {
    from:data.eemail,
    to:data.toemail,
    subject:data.subject,
    html:`

      <hr/>
      <h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 383.9l64 .0404c17.75 0 32-14.29 32-32.03V128.3L0 128.3V383.9zM48 320.1c8.75 0 16 7.118 16 15.99c0 8.742-7.25 15.99-16 15.99S32 344.8 32 336.1C32 327.2 39.25 320.1 48 320.1zM348.8 64c-7.941 0-15.66 2.969-21.52 8.328L228.9 162.3C228.8 162.5 228.8 162.7 228.6 162.7C212 178.3 212.3 203.2 226.5 218.7c12.75 13.1 39.38 17.62 56.13 2.75C282.8 221.3 282.9 221.3 283 221.2l79.88-73.1c6.5-5.871 16.75-5.496 22.62 1c6 6.496 5.5 16.62-1 22.62l-26.12 23.87L504 313.7c2.875 2.496 5.5 4.996 7.875 7.742V127.1c-40.98-40.96-96.48-63.88-154.4-63.88L348.8 64zM334.6 217.4l-30 27.49c-29.75 27.11-75.25 24.49-101.8-4.371C176 211.2 178.1 165.7 207.3 138.9L289.1 64H282.5C224.7 64 169.1 87.08 128.2 127.9L128 351.8l18.25 .0369l90.5 81.82c27.5 22.37 67.75 18.12 90-9.246l18.12 15.24c15.88 12.1 39.38 10.5 52.38-5.371l31.38-38.6l5.374 4.498c13.75 11 33.88 9.002 45-4.748l9.538-11.78c11.12-13.75 9.036-33.78-4.694-44.93L334.6 217.4zM544 128.4v223.6c0 17.62 14.25 32.05 31.1 32.05L640 384V128.1L544 128.4zM592 352c-8.75 0-16-7.246-16-15.99c0-8.875 7.25-15.99 16-15.99S608 327.2 608 336.1C608 344.8 600.8 352 592 352z"/></svg>  CL Connects</h2>
      <h3>Hello Admin,</h3><br><br>
      <p>Following are the details of the person that wants to connect to the CL Connects Admin.<br><br>
      Name : ${data.name}<br><br>
      Email: ${data.email}<br><br>
      Subject: ${data.subject}<br><br>
      Contact No. : ${data.contact}<br><br><br>
      Message : ${data.message}<br><br>
      Date : ${today}<br><br>
      <hr/>
      <img src="https://www.cirruslabs.io/hubfs/Cirruslabs-Assets-20/Images/Cirruslabs-Logo%20for%20Website.jpg" />
      `
};

smtpTransport.sendMail(mailOptions,(error,response)=>{
  if(error){
      res.send(error)
      console.log(error)
  }
  else{
      res.send('Success')
  }
})

smtpTransport.close();

})
//file renaming for upload
const profilestr = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/Serverfiles')
  },
  filename:(req, file, cb) => {
      console.log(file)
     
      let originalFileFrgs = file.originalname.split(".");
      const today = new Date();
      const fullYear = today.getFullYear();
      const month = parseInt((today.getMonth()))+1;
      const day = addZero(today.getDate());
      const Hours = today.getHours();
      const Mins = today.getMinutes();
      const Secs = today.getSeconds();
      let fileSuffix = [day]+"-"+[month]+"-"+[fullYear].join("")+ "-"+[Hours]+ "-" +[Mins]+ "-" +[Secs].join("");
      console.log(fileSuffix);
      originalFileFrgs[0] = fileSuffix;
      file.filename = originalFileFrgs.join(".");
      console.log(file.filename);
      cb(null, file.filename.toString());
      // cb(null, date+ path.extname(file.originalname))
  }
})

//file upload to server
const upload= multer({storage:profilestr})
app.post("/upload", upload.single('file123') ,(req, res) => {
  console.log("inside upload");
  res.redirect('http://localhost:3000/dashboard');
  });

