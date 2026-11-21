import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadFile,
  getFiles,
  deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getFiles).post(upload.single("file"), uploadFile);
router.delete("/:id", deleteFile);

export default router;