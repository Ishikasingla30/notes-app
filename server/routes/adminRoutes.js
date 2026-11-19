import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { getUsers, getAllNotes } from "../controllers/adminController.js";

const router = express.Router();

// Every admin route needs a valid token AND the admin role
router.use(protect, authorizeRoles("admin"));

router.get("/users", getUsers);
router.get("/notes", getAllNotes);

export default router;