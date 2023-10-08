const multer = require("multer");

const uploadImageMemory = (req, res, next) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  // Use upload.single("image") as middleware
  upload.single("image")(req, res, (err) => {
    if (err) {
      // Handle any multer errors, if needed
      return res.status(500).json({ error: "Multer error" });
    }
    // Move to the next middleware or route handler
    next();
  });
};

module.exports = uploadImageMemory;
