import express from "express";
import { requireSignin, canEditDeletePost, isAdmin } from "../middlewares";
const router = express.Router();

import {
	education,
	geteducation,
	userEducation,
	updateEducation,
	deleteEducation,
} from "../controllers/education";
router.post("/education", requireSignin, education);
router.get("/geteducation", requireSignin, geteducation);
router.get("/user-education/:_id", requireSignin, userEducation);
router.put("/update-education/:_id", requireSignin, updateEducation);
router.delete("/delete-education/:_id", requireSignin, deleteEducation);

module.exports = router;
