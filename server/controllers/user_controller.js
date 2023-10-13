const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const { Users, Pictures } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { validateToken } = require('../middlewares/AuthMiddleware');
const pictureController = require("./picture_controller");

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
                broker_licence_url: ""
            }).catch((err) => {
                if (err instanceof Sequelize.UniqueConstraintError) {
                    return res.status(400).json({ message: 'Email already exists' });
                } else {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            });
            //res.json("true");
        })
    },
    getUserByEmail: async (req, res) => {

        const { email, password } = req.body;
        try {
            const user = await Users.findOne({ where: { email: email } })
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
                res.json({ token: accessToken, role: user.role, email: email, id: user.id, approval: user.broker_approval });
            });
        } catch (err) {
            res.json(err);
            return;
        };


    },
    getAuth: [validateToken, (req, res) => {

        res.json(req.user);
    }],
    getById: async (req, res) => {

        const id = req.params.id;
        const user = await Users.findOne({ where: { id: id } })
            .catch((err) => {
                return res.json(err);
            });
        if (!user) {
            return res.json({ error: "User Doesn't Exist" });
        } else {
            res.json(user);
        }
    },

    getUserByRole: async (req, res) => {
        const role = req.params.role;
        
        const users = await Users.findAll({ where: { role: role }, include: [Pictures] })
            .catch((err) => {
                return res.json(err);
            });
        if (!users) {
            return res.json({ error: "There is no " + { role } });
        } 

        await Promise.all(
            users.map(async(user)=>{
                const picture = await pictureController.getByBroker(req,res,user.id);
                if(picture){
                    user.Pictures=[picture];
                
                }else{
                    user.Pictures=[];
                }
            })
        )
        res.status(200).json(users);
    }   

};




//module.exports = router;