const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const { Users, Pictures } = require("../models");
const pictureController = require("./picture_controller");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const validator = require("validator");
const { validateToken } = require("../middlewares/AuthMiddleware");
const nodemailer = require("nodemailer");

module.exports = {
  add: async (req, res) => {
    const { email, password, role } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        email: email,
        password: hash,
        name: "",
        phone: "",
        address: "",
        city: "",
        postal: "",
        role: role,
        is_active: 1,
        broker_approval: "", 
        broker_licence_url: "",
      }).catch((err) => {
        if (err instanceof Sequelize.UniqueConstraintError) {
          return res.status(400).json({ message: "Email already exists" });
        } else {
          return res.status(500).json({ message: "Internal Server Error" });
        }
      });
      res.json("true");
    });
  },
  getAll: async (req, res) => {
    const users = await Users.findAll({
      include: [Pictures],
    }).catch((err) => {
      return res.json(err);
    });
    if (!users) {
      return res.json({ error: "There is no " + { role } });
    } else {
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].Pictures.length; j++) {
          users[i].Pictures[j].imageUrl =
            await pictureController.getPicUrlFromS3(
              req,
              users[i].Pictures[j].imageName
            );
        }
      }
      return res.json(users);
    }
  },
  getUserByEmail: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        return res.json({ error: "User Doesn't Exist" });
      }
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return res.json({ error: "Wrong email And Password Combination" });
        }
        const JWT_SECRET = process.env.JWT_SECRET;

        const accessToken = sign(
          {
            email: user.email,
            id: user.id,
            role: user.role,
            approval: user.broker_approval,
          },
          JWT_SECRET
        );
        res.json({
          token: accessToken,
          email: email,
          id: user.id,
          approval: user.broker_approval,
          role: user.role,
        });
      });
    } catch (err) {
      res.json(err);
      return;
    }
  },
  getAuth: async (req, res) => {
    res.json(req.user);
  },

  getById: async (req, res) => {
    const id = req.user.id;
    const user = await Users.findOne({
      where: { id: id },
      include: [Pictures],
    }).catch((err) => {
      return res.json(err);
    });

    if (!user) {
      return res.json({ error: "There is no " + { id } });
    } else {
      for (let i = 0; i < user.Pictures.length; i++) {
        user.Pictures[i].imageUrl = await pictureController.getPicUrlFromS3(
          req,
          user.Pictures[i].imageName
        );
      }

      return res.json(user);
    }
  },

  getUserByRole: async (req, res) => {
    const users = await Users.findAll({
      where: { role: "broker", broker_approval: 1 },
      include: [Pictures],
    }).catch((err) => {
      return res.json(err);
    });
    if (!users) {
      return res.json({ error: "There is no " + { role } });
    } else {
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].Pictures.length; j++) {
          users[i].Pictures[j].imageUrl =
            await pictureController.getPicUrlFromS3(
              req,
              users[i].Pictures[j].imageName
            );
        }
      }
      return res.json(users);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.user.id;
      const updateUser = await Users.update(req.body, { where: { id: id } });
      res.json(updateUser);
    } catch (err) {
      res.json(err);
      return;
    }
  },

  approve: async (req, res) => {
    try {
      const id = req.body.id;
      const approveUser = await Users.update(req.body, { where: { id: id } });
      res.json(approveUser);
    } catch (err) {
      res.json(err);
      return;
    }
  },

  getByIdParam: async (req, res) => {
    const id = req.params.id;
    const user = await Users.findOne({
      where: { id: id },
      include: [Pictures],
    }).catch((err) => {
      return res.json(err);
    });

    if (!user) {
      return res.json({ error: "There is no " + { id } });
    } else {
      for (let i = 0; i < user.Pictures.length; i++) {
        user.Pictures[i].imageUrl = await pictureController.getPicUrlFromS3(
          req,
          user.Pictures[i].imageName
        );
      }

      return res.json(user);
    }
  },

  recoverEmail: async (req, res)=>{
    console.log(req.body);
      sendEmail(req.body)
      .then((response) => {
          return res.send(response.message)})
      .catch((error) => {
          return res.status(500).send(error.message)});
  },

  resetPassword: async (req, res)=>{
    try {
      const password = req.body.password;
      const email = req.body.email;
      // const hashedPassword = await bcrypt.hash(password, 10);
      // console.log("=======hashedPassword=========",hashedPassword)
      bcrypt.hash(password, 10).then((hash) => {
        console.log("after hash",hash);
        Users.update(
          { password: hash },
          {
            where: {
              email: email,  
            },
        }).catch((err)=>{
          console.log(err);
          return;
        });
        res.json('true');
      })
      } catch (err) {
        res.json(err);
        return;
      }
  },

  //check if input email exist 
  checkEmailExist: async (req, res)=>{
    const email = req.params.email
    const count = await Users.count({
      where: {email:email}, 
      distinct: true,
      attributes: ["id"],
    }).catch((err)=>{
      return res.status(404).json(err);
    });

    if(count==0){
      return res.status(516).json({error:"Email not exist in our system."});
    }else{
      return res.json("true");
    }
  }
};



//bellemaisomwei@gmail.com
//xgxs rngp wpgz clau
function sendEmail({ recipient_email, OTP }) {
  console.log("======recipient_email=====",recipient_email);
  console.log("======OTP=====",OTP);
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      // port: 465, 
      service: "gmail",
      auth: {
        //TODO : need to move to .env file
        user: "bellemaisomwei@gmail.com",
        pass: "xgxs rngp wpgz clau",
      },
    });

    const mail_configs = {
      from: "bellemaisomwei@gmail.com",
      to: recipient_email,
      subject: "BelleMaison PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
      <html lang="en" >
      <head>
          <meta charset="UTF-8">
          <title>BelleMaison - OTP Email Template</title>
          
      
      </head>
      <body>
      <!-- partial:index.partial.html -->
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Belle Maison</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing BelloMaison. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
          <p style="font-size:0.9em;">Regards,<br />BelloMaison</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>BelloMaison</p>
              <p>1780 San Francisco</p>
              <p>Quebec</p>
          </div>
          </div>
      </div>
      <!-- partial -->
          
      </body>
      </html>`,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

//module.exports = router;
