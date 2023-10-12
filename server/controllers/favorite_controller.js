const express = require('express');
const router = express.Router();
const {Favorites} = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");


module.exports = {
    setFavorite: [validateToken, async (req, res) => {
        const {property_id} = req.body;
        const user_id = req.user.id;
        const found = await Favorites.findOne({
            where: { property_id: property_id, user_id: user_id },
        }).catch((err)=>{
            res.json(err);
        });

        if(!found){
            await Favorites.create({property_id: property_id, user_id: user_id})
            .catch((err)=>{
                return res.json(err);
            });
            res.json({liked: true});
           
        }else {
            await Favorites.destroy({where: 
                { property_id: property_id, user_id: user_id }})
            .catch((err)=>{
                return res.json(err);
            });
            res.json({liked: false});
        }
    }]
}
