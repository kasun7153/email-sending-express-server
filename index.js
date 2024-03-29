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
      user: "email", 
      pass: "password", 
    },
  })

  app.get("/",(req,res)=>{
      res.send("Email sending Node server by Me")
})

app.post("/api/v1",(req,res)=>{
    console.log(req.body)

    transporter.sendMail({
        from: req.body.from+"<reciver email>", 
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

app.listen(process.env.PORT || 3000,()=>{
    console.log('Express server listening on port %d', process.env.PORT);
})
