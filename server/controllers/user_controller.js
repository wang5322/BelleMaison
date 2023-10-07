const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const {Users} = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');

const {validateToken} = require('../middlewares/AuthMiddleware');
 
module.exports = {
    add: async (req, res)=>{
        const { email, password,name,phone,address,city,postal,
                role,is_active,broker_approval,broker_licence_url} = req.body;
    //TODO CHECK IF EMAIL ALREADY EXIST
        bcrypt.hash(password, 10).then((hash)=>{
            Users.create({
                email: email,
                password: hash,
                name: name,
                phone: phone,
                address: address,
                city: city,
                postal: postal,
                role: role,
                is_active: is_active,
                broker_approval: broker_approval,
                broker_licence_url: broker_licence_url
            }).catch((err)=>{
                if (err instanceof Sequelize.UniqueConstraintError) {
                    return res.status(400).json({ message: 'Email or Username already exists' });
                } else {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            });
            res.json("true");
        }) 
    },
    getUserByEmail: async (req, res) => { 
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email: email } });
    
        if (!user){
            return res.json({ error: "User Doesn't Exist" });
        }
console.log("======user.password======",user.password);
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                return res.json({ error: "Wrong Username And Password Combination" });
            }
            const JWT_SECRET = process.env.JWT_SECRET;
            console.log("======JWT_SECRET======",JWT_SECRET);
     

            const accessToken = sign(
                {email: user.email, id: user.id},
                JWT_SECRET
            );
            res.json({token:accessToken, email: email, id: user.id});
        });
    },
    getAuth: [validateToken, (req, res)=>{
        res.json(req.user);
    }],
    getById: async (req, res) => { 
        const id = req.params.id;
console.log(" ==============id==============",id);
        const user = await Users.findOne({ where: { id: id } })
        .catch((err)=>{
            return res.json(err);
        });
        if (!user){
            return res.json({ error: "User Doesn't Exist" });
        }else{
            res.json(user);
        }
    },

};
 



//module.exports = router;