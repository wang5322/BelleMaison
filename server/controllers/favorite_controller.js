const express = require('express');
const router = express.Router();
const { Favorites, Properties, Pictures } = require('../models');
const pictureController = require("./picture_controller");


module.exports = {
    setFavorite: async (req, res) => {
        const { property_id } = req.body;
        const user_id = req.user.id;
        const found = await Favorites.findOne({
            where: { property_id: property_id, user_id: user_id },
        }).catch((err) => {
            res.json(err);
        });

        if (!found) {
            await Favorites.create({ property_id: property_id, user_id: user_id })
                .catch((err) => {
                    return res.json(err);
                });
            res.json({ liked: true });

        } else {
            await Favorites.destroy({
                where:
                    { property_id: property_id, user_id: user_id }
            })
                .catch((err) => {
                    return res.json(err);
                });
            res.json({ liked: false });
        }
    },

    getFavorite: async (req, res) => {
        try {
            const userId = req.user.id;
            const favorites = await Favorites.findAll({
                where: { user_id: userId },
                include: {
                    model: Properties,
                    include: {
                        model: Pictures,
                        // where: {
                        //     broker_id: null,
                        //     isCertificate: false,
                        // }
                    }
                },
            });

            for (let i = 0; i< favorites.length; i++) {
                for (let j = 0; j < favorites[i].Property.Pictures.length; j++) {
                    favorites[i].Property.Pictures[j].imageUrl =
                        await pictureController.getPicUrlFromS3(
                            req,
                            favorites[i].Property.Pictures[j].imageName
                        );
                }
            }
            res.json(favorites);
        } catch (err) {
            return res.status(500).json({error: err});
        }
    }
}
