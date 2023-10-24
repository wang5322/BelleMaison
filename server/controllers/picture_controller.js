const { Pictures } = require("../models");
var validator = require("validator");
const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

module.exports = {
  add: async (req, res) => {
    try {
      console.log("=====entered picture_controller add=====");
      let propertyId = null;
      let brokerId = null;
      let isCertificate = 0;

      //TODO: add auth payload(eg: userId, userEmail)
      if (req.body.propertyId) {
        propertyId = req.body.propertyId;
        console.log("======req.property_id=======", propertyId);
      }
      if (req.body.brokerId) {
        brokerId = req.body.brokerId;
        console.log("======req.broker_id=======", brokerId);
      }
      if (req.body.isCertificate) {
        isCertificate = req.body.isCertificate;
      }

      // console.log("======req.file==============", req.files);
      // req.file.buffer;
      // console.log("entering add method");
      const randomImageName = (bytes = 32) =>
        crypto.randomBytes(bytes).toString("hex");

      // Handling multiple files, iterate over req.files
      const pictures = await Promise.all(
        req.files.map(async (file) => {
          const imageName = randomImageName();
          const s3Key = `${file.originalname}-${imageName}`;

          const params = {
            Bucket: req.bucketName,
            Key: s3Key,
            Body: file.buffer,
            ContentType: file.mimetype,
          };

          const command = new PutObjectCommand(params);
          await req.s3.send(command);

          const pictureData = {
            imageName: s3Key,
            property_id: propertyId,
            broker_id: brokerId,
            isCertificate: isCertificate,
            isThumb: 0,
          };

          return await Pictures.create(pictureData);
        })
      );

      res.status(201).json(pictures);
    } catch (error) {
      console.error("Error in add method:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  addThumb: async (req, res) => {
    try {
      console.log("=====entered picture_controller add=====");
      let propertyId = null;
      if (req.body.propertyId) {
        propertyId = req.body.propertyId;
        console.log("======req.property_id=======", propertyId);
      }

      console.log("======req.file==============", req.files);
      // req.file.buffer;
      const randomImageName = (bytes = 32) =>
        crypto.randomBytes(bytes).toString("hex");

      // Handling multiple files, iterate over req.files
      const pictures = await Promise.all(
        req.files.map(async (file) => {
          const imageName = randomImageName();
          let lastIndex = file.originalname.lastIndexOf(".");
          const fileName =
            file.originalname.substring(0, lastIndex) +
            "-thumbnail" +
            file.originalname.substring(lastIndex);
          s3Key = `${fileName}-${imageName}`;

          const params = {
            Bucket: req.bucketName,
            Key: s3Key,
            Body: file.buffer,
            ContentType: file.mimetype,
          };

          const command = new PutObjectCommand(params);
          await req.s3.send(command);

          const pictureData = {
            imageName: s3Key,
            property_id: propertyId,
            isCertificate: 0,
            isThumb: 1,
          };

          return await Pictures.create(pictureData);
        })
      );

      res.status(201).json(pictures);
    } catch (error) {
      console.error("Error in add method:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // NOT IMPLEMENTED  Add original images and resized image thumbnails
  addOriginThumb: async (req, res) => {
    try {
      console.log("=====entered picture_controller addThumbnail=====");
      let propertyId = null;
      let brokerId = null;
      let isCertificate = 0;
      //TODO: add auth payload(eg: userId, userEmail)
      if (req.body.propertyId) {
        propertyId = req.body.propertyId;
        console.log("======req.property_id=======", propertyId);
      }
      if (req.body.brokerId) {
        brokerId = req.body.brokerId;
        console.log("======req.broker_id=======", brokerId);
      }
      if (req.body.isCertificate) {
        isCertificate = req.body.isCertificate;
      }

      // console.log("======req.file==============", req.files);
      // req.file.buffer;

      const randomImageName = (bytes = 32) =>
        crypto.randomBytes(bytes).toString("hex");

      //seperate originalImages and resizedImages
      const originalImages = req.files.originalImages;
      const resizedImages = req.files.resizedImages;

      // Handling multiple files, iterate over originalImages
      console.log("===originalImages===", originalImages);
      console.log("===resizedImages===", resizedImages);

      //upload Original Images
      const originalPictures = await Promise.all(
        originalImages.map(async (file) => {
          const imageName = randomImageName();
          s3Key = `${file.originalname}-${imageName}`;

          const params = {
            Bucket: req.bucketName,
            Key: s3Key,
            Body: file.buffer,
            ContentType: file.mimetype,
          };

          const command = new PutObjectCommand(params);
          await req.s3.send(command);

          const pictureData = {
            imageName: s3Key,
            property_id: propertyId,
            broker_id: brokerId,
            isCertificate: isCertificate,
          };

          return await Pictures.create(pictureData);
        })
      );

      //upload Resized Images
      const resizedPictures = await Promise.all(
        resizedImages.map(async (file) => {
          const imageName = randomImageName();
          let lastIndex = file.originalname.lastIndexOf(".");
          const fileName =
            file.originalname.substring(0, lastIndex) +
            "-thumbnail" +
            file.originalname.substring(lastIndex);
          s3Key = `${fileName}-${imageName}`;

          const params = {
            Bucket: req.bucketName,
            Key: s3Key,
            Body: file.buffer,
            ContentType: file.mimetype,
          };

          const command = new PutObjectCommand(params);
          await req.s3.send(command);

          const pictureData = {
            imageName: s3Key,
            property_id: propertyId,
            broker_id: brokerId,
            isCertificate: isCertificate,
          };

          return await Pictures.create(pictureData);
        })
      );
      res.status(201).json({
        originalPictures: originalPictures,
        resizedPictures: resizedPictures,
      });
    } catch (error) {
      console.error("Error in add method:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  //
  getByProp: async (req, res) => {
    try {
      const id = req.params.id;
      const pictures = await Pictures.findAll({ where: { property_id: id } });

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
      //console.log("Pictures with URLs:", pictures);

      res.status(200).send(pictures);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  //use bu home page, for get only one property image.
  getByPropForHome: async (req, res, propertyId) => {
    try {
      const picture = await Pictures.findOne({
        where: { property_id: propertyId },
        order: [["id", "ASC"]],
      });
      if (picture) {
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
        } catch (error) {
          console.error("==========Error generating signed URL:", error);
        }
      }
      return url;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  //   Get broker's profile photo and certificates
  getByBroker: async (req, res, brokerId = null) => {
    try {
      if (brokerId == null) {
        const id = req.params.id;
      } else {
        const id = brokerId;
      }

      const pictures = await Pictures.findAll({
        where: { broker_id: id, isCertificate: null },
      });
      if (!pictures) {
        res.status(400).json({ message: "Pictures not found" });
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
    // try{
    //   const id = req.params.id;
    //   const pictures = await Pictures.findAll({ where:{broker_id:id,isCertificate:null}});
    // }
  },

  getPicUrlFromS3: async (req, imageName) => {
    const getObjectParams = {
      Bucket: req.bucketName,
      Key: imageName,
    };
    const command = new GetObjectCommand(getObjectParams);

    try {
      const url = await getSignedUrl(req.s3, command, {
        expiresIn: 3600,
      });
      return url;
    } catch (error) {
      console.error("=====Error generating signed URL:=====", error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const picture = await Pictures.findOne({
        where: { id: id },
      });
      if (!picture) {
        res.status(400).json({ message: "Picture not found" });
        return;
      }

      const params = {
        Bucket: req.bucketName,
        Key: picture.imageName,
      };
      const command = new DeleteObjectCommand(params);
      await req.s3.send(command);

      await Pictures.destroy({ where: { id } });
      res.status(200).send(picture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
