const { Properties, Favorites } = require("../models");

var validator = require("validator");

module.exports = {
  add: async (req, res) => {
    try {
      const property = req.body;
      // TODO: add auth middleware
      // const userId = req.user.id;
      // property.broker_id = userId;
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
      const properties = await Properties.findAll();
      if (!properties) {
        res.status(400).json({ message: "Properties don't exist" });
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
        where: { id: id }, include:[Favorites]
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

      res
        .status(200)
        .json({
          message: `Propery of id ${id} has been successfully updated.`,
        });
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
  if (!validator.isLength(property.year_built, { min: 4, max: 4 })) {
    res.status(400).send({
      message: "Year must be 4 characters",
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
