const { Pictures } = require("../models");
var validator = require("validator");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

module.exports = {
  add: async (req, res) => {
    try {
      //TODO: add auth payload(eg: userId, userEmail)
      // const Picture = req.body;
      // console.log("req.body", Picture);
      // console.log("req.file", req.file);

      //   req.file.buffer;
      const randomImageName = (bytes = 32) =>
        crypto.randomBytes(bytes).toString("hex");
      const imageName = randomImageName();
      const s3key = `${req.file.originalname}-${imageName}`;
      // console.log("randomImage", imageName);

      const params = {
        Bucket: req.bucketName,
        Key: s3key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);

      await req.s3.send(command);
      const picture = await Pictures.create({
        imageName: s3key,
        property_id: 6,
      });

      res.status(201).json(picture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  //
  getByProp: async (req, res) => {
    try {
      const id = req.params.id;
      const pictures = await Pictures.findAll({ where: { property_id: id } });

      // for (const picture of pictures) {
      //   const getObjectParams = {
      //     Bucket: req.bucketName,
      //     Key: picture.imageName,
      //   };
      //   // console.log(picture.imageName);
      //   const command = new GetObjectCommand(getObjectParams);
      //   const url = await getSignedUrl(req.s3, command, { expiresIn: 3600 });
      //   picture.imageUrl = url;
      //   console.log("imageURLofPicture:", picture.imageUrl);
      // }

      await Promise.all(
        pictures.map(async (picture) => {
          const getObjectParams = {
            Bucket: req.bucketName,
            Key: picture.imageName,
          };
          const command = new GetObjectCommand(getObjectParams);

          try {
            const url = await getSignedUrl(req.s3, command, {
              expiresIn: 3600,
            });
            picture.imageUrl = url;
            // console.log("imageURLofPicture:", picture.imageUrl);
          } catch (error) {
            console.error("Error generating signed URL:", error);
          }
        })
      );
      console.log("Pictures with URLs:", pictures);

      res.status(200).send(pictures);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  //   Get broker's profile photo and certificates
  getByBroker: async (req, res) => {
    try {
      const id = req.params.id;
      const pictures = await Pictures.findAll({ where: { broker_id: id } });
      if (!pictures) {
        res.status(400).json({ message: "Pictures don't exist" });
      }
      for (const picture of pictures) {
        const getObjectParams = {
          Bucket: req.bucketName,
          Key: picture.imageName,
        };
        // console.log(picture.imageName);
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(req.s3, command, { expiresIn: 3600 });
        picture.imageUrl = url;
        // console.log("imageURLofPicture:", picture.imageUrl);
      }

      res.status(200).send(pictures);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const property = await Pictures.findOne({
        where: { id: id },
      });
      if (!property) {
        res.status(400).json({ message: "Picture doesn't exist" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
