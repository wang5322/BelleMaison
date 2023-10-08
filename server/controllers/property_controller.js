const { Properties } = require("../models");
var validator = require("validator");

module.exports = {
  add: async (req, res) => {
    try {
      //TODO: add auth payload(eg: userId, userEmail)
      if (isValidProperty(Property, res)) {
        const addedProperty = await Properties.create(Property);
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
        where: { id: id },
      });

      if (!property) {
        res.status(400).json({ message: "Property doesn't exist" });
      }
      res.status(200).json(property);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  toggleActive: async (req, res) => {
    try {
      const id = req.params.id;
      const property = await Properties.findOne({
        where: { id: id },
      });
      if (!property) {
        res.status(400).json({ message: "Property doesn't exist" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const property = await Properties.findOne({
        where: { id: id },
      });
      if (!property) {
        res.status(400).json({ message: "Property doesn't exist" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

function isValidProperty(property, res) {
  if (!validator.isLength(property.address, { min: 10, max: 100 })) {
    res.status(400).send({
      message: "Address must be between 10-100 characters",
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
  if (validator.isEmpty(property.rooms)) {
    res.status(400).send({
      message: "Room number is required",
    });
    return false;
  }
  if (validator.isEmpty(property.bathrooms)) {
    res.status(400).send({
      message: "Bathroom number is required",
    });
    return false;
  }
  if (validator.isEmpty(property.bedrooms)) {
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
  if (validator.isEmpty(property.price)) {
    res.status(400).send({
      message: "Price is required",
    });
    return false;
  }
  if (validator.isEmpty(property.isAction)) {
    res.status(400).send({
      message: "isAction is required",
    });
    return false;
  }
  return true;
}
