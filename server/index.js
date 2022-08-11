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
      <img src="https://www.cirruslabs.io/hubfs/Cirruslabs-Assets-20/Images/Cirruslabs-Logo%20for%20Website.jpg" />
      <h3>Hello Admin,</h3><br><br>
      <p>Following are the details of the person that wants to connect to the CL Connects Admin.<br><br>
      Name : ${data.name}<br><br>
      Email: ${data.email}<br><br>
      Subject: ${data.subject}<br><br>
      Contact No. : ${data.contact}<br><br><br>
      Message : ${data.message}<br><br>
      Date : ${today}<br><br>
      <hr/>`
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

