import File from "../models/File.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Please choose a file to upload" });
  }

  const result = await uploadToCloudinary(
    req.file.buffer,
    `scrivault/${req.user._id}`
  );

  const file = await File.create({
    userId: req.user._id,
    originalName: req.file.originalname,
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
    mimeType: req.file.mimetype,
    size: req.file.size,
  });

  res.status(201).json({ success: true, file });
};

export const getFiles = async (req, res) => {
  const files = await File.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
  res.json({ success: true, count: files.length, files });
};

export const deleteFile = async (req, res) => {
  // userId in the filter: nobody can delete another user's file
  const file = await File.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!file) {
    return res
      .status(404)
      .json({ success: false, message: "File not found" });
  }

  await cloudinary.uploader.destroy(file.publicId, {
    resource_type: file.resourceType,
  });

  res.json({ success: true, message: "File deleted" });
};