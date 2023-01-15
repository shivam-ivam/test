const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { Router } = require("express");
const app = express();
require("./Database/dbConnection"); // mongo atlas connection

env.config({ path: "./config.env" });

app.use(cookieParser());
// const User = require("./Database/dbSchema"); // data base schema 

// json to object middleware
app.use(express.json());

// cors 
app.use(cors({
  origin: process.env.BASE_URL,
  credentials:true,
}));



// Router
app.use(require("./router/auth"));


app.get("/test", (req,res)=>{
  res.send("hi there! I'm from the server side");
})

// heroku
if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`server is started at port ${process.env.PORT || 5000}`);
});
