import express from "express";

const router = express.Router();

// middleware
import { isAdmin, requireSignin } from "../middlewares";
// controllers
import {
	register,
	login,
	currentUser,
	forgotPassword,
	profileUpdate,
	findPeople,
	addFollower,
	userFollow,
	userFollowing,
	removeFollower,
	userUnfollow,
	searchUser,
	getUser,
	verifyUser,
	resetPassword,
	confirmPassword,
} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);

router.put("/profile-update", requireSignin, profileUpdate);
router.get("/find-people", requireSignin, findPeople);

router.put("/user-follow", requireSignin, addFollower, userFollow);
router.put("/user-unfollow", requireSignin, removeFollower, userUnfollow);
router.get("/user-following", requireSignin, userFollowing);
router.get("/search-user/:query", searchUser);
router.get("/user/:username", getUser);
router.get("/user/:_id/verify/:token", verifyUser);
router.get("/reset-password/:_id/:token", resetPassword);
router.post("/reset-password/:_id/:token", confirmPassword);
router.get("/current-admin", requireSignin, isAdmin, currentUser);
module.exports = router;
