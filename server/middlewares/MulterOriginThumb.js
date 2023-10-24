const multer = require("multer");

const uploadTwoImages = (req, res, next) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  console.log("=====entering multer middleware method=====");

  //upload.fields() handles multiple files, each with its own field name.
  upload.fields([{ name: "originalImages" }, { name: "resizedImages" }])(
    req,
    res,
    (err) => {
      if (err) {
        // Handle any multer errors, if needed
        console.log("this is a multer error", err);
        return res.status(500).json({ error: "Multer error" });
      }
      // Move to the next middleware or route handler
      next();
    }
  );
};

module.exports = uploadTwoImages;
