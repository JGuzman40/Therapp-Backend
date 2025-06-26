const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "therapp/segmentos",
    resource_type: "auto",
    public_id: `${Date.now()}-${file.originalname
      .split('.')[0]
      .replace(/\s+/g, '_')
      .replace(/[^\w\-]/g, '')}`,
  }),
});

const upload = multer({ storage }).array("files", 10);

const uploadSegmentFiles = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error al subir archivos", error: err.message });
    }

    if (req.files && req.files.length > 0) {
      req.filesData = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
        name: file.originalname,
        type: file.mimetype,
      }));
    }

    next();
  });
};

module.exports = uploadSegmentFiles;
