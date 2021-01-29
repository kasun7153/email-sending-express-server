const express = require("express");
const cors = require('cors')
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')

const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());


const  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "app.nodemailer@gmail.com", 
      pass: "Nodemailer123", 
    },
  });

  app.get("/",(req,res)=>{
      res.send("Email sending Node server by Kasun")
})

app.post("/api/v1",(req,res)=>{
    console.log(req.body)

    transporter.sendMail({
        from: req.body.from+"<app.nodemailer@gmail.com>", 
        to: req.body.to,
        subject: req.body.subject, 
        html: req.body.html
      }).then((respond)=>{
        console.log(respond)
        res.json({
            sucess:1,
            message:"Email sent",
        })
      }).catch(err=>{
          console.log(err)
          res.json({
            sucess:0,
            message:"Email sending failed",
            error:err.message
        })
      });
})

app.listen(process.env.APP_PORT||3000,()=>{
    console.log("Server is running on",process.env.APP_PORT||3000)
})
