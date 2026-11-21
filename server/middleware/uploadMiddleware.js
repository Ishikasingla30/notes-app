import multer from "multer";

const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const upload = multer({
  // Keep the file in memory, then stream it to Cloudinary
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) return cb(null, true);
    const error = new Error("Only PDF, PNG, JPG and DOCX files are allowed");
    error.statusCode = 400;
    cb(error);
  },
});

export default upload;