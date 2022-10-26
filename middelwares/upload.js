const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfige = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, req.originalname);
  },
});

const upload = multer({
  storage: multerConfige,
});

module.exports=upload;