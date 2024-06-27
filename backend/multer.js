const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "audio/mp3" ||
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/wav" ||
    file.mimetype === "audio/ogg"
  ) {
    cb(null, true);
  } else {
    cb({ message: "unsuppored file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6 *10,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
