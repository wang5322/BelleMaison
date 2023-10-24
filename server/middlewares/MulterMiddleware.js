const multer = require("multer");

const uploadImageMemory = (req, res, next) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  console.log("=====entering multer middleware method=====");

  // Use upload.array("images") to handle multiple files
  upload.array("images")(req, res, (err) => {
    if (err) {
      // Handle any multer errors, if needed
      console.log("this is a multer error", err);
      return res.status(500).json({ error: "Multer error" });
    }
    // Move to the next middleware or route handler
    next();
  });
};

module.exports = uploadImageMemory;
