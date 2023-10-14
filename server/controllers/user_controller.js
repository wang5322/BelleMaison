const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const { Users, Pictures } = require("../models");
const pictureController = require("./picture_controller");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const validator = require('validator');
const { validateToken } = require("../middlewares/AuthMiddleware");

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
      //res.json("true");
    });
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
          { email: user.email, id: user.id, role: user.role },
          JWT_SECRET
        );
        res.json({
          token: accessToken,
          role: user.role,
          email: email,
          id: user.id,
          approval: user.broker_approval,
        });
      });
    } catch (err) {
      res.json(err);
      return;
    }
  },
  getAuth: [
    validateToken,
    (req, res) => {
      res.json(req.user);
    },
  ],
  getById: async (req, res) => {
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

  update: async(req,res)=>{
    const id = req.params.id;
    const updateUser=await Users.update(req.body,{where:{id:id}});  
    res.json(updateUser);   
  }

};

//module.exports = router;
