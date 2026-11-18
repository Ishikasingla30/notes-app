import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
  toggleArchive,
  getTrash,
  restoreNote,
  deleteForever
} from "../controllers/noteController.js";
const router = express.Router();

router.use(protect);

router.route("/").get(getNotes).post(createNote);
router.get("/trash", getTrash);
router.route("/:id").put(updateNote).delete(deleteNote);
router.patch("/:id/pin", togglePin);
router.patch("/:id/archive", toggleArchive);
router.patch("/:id/restore", restoreNote);
router.delete("/:id/permanent", deleteForever);

export default router;