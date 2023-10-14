const { Properties, Favorites, Pictures } = require("../models");
const pictureController = require("./picture_controller");

var validator = require("validator");

module.exports = {
  add: async (req, res) => {
    try {
      const property = req.body;
      const userId = req.user.id;
      property.broker_id = userId;
      // property.broker_id = 2;
      if (isValidProperty(property, res)) {
        const addedProperty = await Properties.create(property);
        res.status(201).json(addedProperty);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  //   Display on home Page
  getAll: async (req, res) => {
    try {
      const properties = await Properties.findAll({
        include: [Pictures],
      });
      if (properties.length === 0) {
        res.status(400).json({ message: "Properties don't exist" });
      }

      // Call the getByProp method from picture_controller for each property
      // await Promise.all(
      //   properties.map(async (property) => {
      //     const picture = await pictureController.getByPropForHome(req, res, property.id);
      //     if (picture) {
      //       property.Pictures = [picture];
      //     } else {
      //       property.Pictures = []; // If there's no picture, add an empty array
      //     }
      //   })
      // )

      for (let i = 0; i < properties.length; i++) {
        for (let j = 0; j < properties[i].Pictures.length; j++) {
          properties[i].Pictures[j].imageUrl =
            await pictureController.getPicUrlFromS3(
              req,
              properties[i].Pictures[j].imageName
            );
        }
      }
      res.status(200).json(properties);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  //   Display on property Page
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const property = await Properties.findOne({
        where: { id: id },
        include: [Favorites],
      });
      if (!property) {
        res.status(400).json({ message: "Property doesn't exist" });
      }
      res.status(200).json(property);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
    // const favoriteProperty = await Favorites.findAll({where:{user_id:req.user.id}});
    // res.json({property: property, favoriteProperty: favoriteProperty});
  },

  getByBroker: async (req, res) => {
    try {
      console.log("=======entered property getByBroker method ========");
      const brokerId = req.user.id;
      console.log("brokerId=====", brokerId);
      const properties = await Properties.findAll({
        where: { broker_id: brokerId },
        include: [Pictures],
      });
      if (properties.length === 0) {
        res.status(400).json({ message: "Properties don't exist" });
      }
      for (let i = 0; i < properties.length; i++) {
        for (let j = 0; j < properties[i].Pictures.length; j++) {
          properties[i].Pictures[j].imageUrl =
            await pictureController.getPicUrlFromS3(
              req,
              properties[i].Pictures[j].imageName
            );
        }
      }
      res.status(200).json(properties);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  toggleActive: async (req, res) => {
    try {
      const toggleData = req.body;
      const id = req.params.id;
      const property = await Properties.findOne({
        where: { id: id },
      });
      if (!property) {
        res.status(400).json({ message: "Property doesn't exist" });
      }
      await property.update(toggleData, {
        where: { id: id },
      });
      res.status(200).json({ message: "Property's state has been toggled" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const newProperty = req.body;
      const property = await Properties.findOne({
        where: { id: id },
      });
      if (!property) {
        res.status(400).json({ message: "Property doesn't exist" });
      }
      const updatedProperty = await Properties.update(newProperty, {
        where: { id: id },
      });

      res.status(200).json(updatedProperty);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

function isValidProperty(property, res) {
  if (property.broker_id === null || property.broker_id <= 0) {
    res.status(400).send({
      message: "Broker id is required",
    });
    return false;
  }
  if (!validator.isLength(property.address, { min: 10, max: 100 })) {
    res.status(400).send({
      message: "Address must be between 10-100 characters",
    });
    return false;
  }
  if (validator.isEmpty(property.city)) {
    res.status(400).send({
      message: "City name is required",
    });
    return false;
  }
  if (!validator.isLength(property.postal, { min: 6, max: 7 })) {
    res.status(400).send({
      message: "Address must be between 6-7 characters",
    });
    return false;
  }
  if (
    !validator.isIn(property.type, [
      "single-family",
      "studio",
      "condo",
      "plex",
      "cottage",
    ])
  ) {
    res.status(400).send({
      message: "Type needs to be in the enum values array",
    });
    return false;
  }
  if (property.rooms === null || property.rooms <= 0) {
    res.status(400).send({
      message: "Room number is required",
    });
    return false;
  }
  if (property.bathrooms === null || property.bathrooms <= 0) {
    res.status(400).send({
      message: "Bathroom number is required",
    });
    return false;
  }
  if (property.bedrooms === null || property.bedrooms < 0) {
    res.status(400).send({
      message: "Bedroom number is required",
    });
    return false;
  }
  if (property.year_built === null || property.year_built <= 0) {
    res.status(400).send({
      message: "Year built is required, and must be an integer",
    });
    return false;
  }
  if (property.price === null || property.price <= 0) {
    res.status(400).send({
      message: "Price is required, and must be an integer",
    });
    return false;
  }
  if (property.isActive !== 0 && property.isActive !== 1) {
    res.status(400).send({
      message: "isAction is required",
    });
    return false;
  }
  return true;
}
