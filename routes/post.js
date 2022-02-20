import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import { requireSignin, canEditDeletePost, isAdmin } from "../middlewares";
// controllers
import {
	createPost,
	uploadImage,
	postsByUser,
	userPost,
	updatePost,
	deletePost,
	newsFeed,
	likePost,
	unlikePost,
	addComment,
	removeComment,
	totalPost,
	posts,
	getPost,
} from "../controllers/post";

router.post("/create-post", requireSignin, createPost);
router.post(
	"/upload-image",
	requireSignin,
	formidable({ maxFileSize: 5 * 1024 * 1024 }),
	uploadImage
);

router.get("/user-posts", requireSignin, postsByUser);
router.get("/user-post/:_id", requireSignin, userPost);
router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost);
router.delete(
	"/delete-post/:_id",
	requireSignin,
	canEditDeletePost,
	deletePost
);

router.get("/news-feed/:page", requireSignin, newsFeed);

router.put("/post-like", requireSignin, likePost);
router.put("/post-unlike", requireSignin, unlikePost);
router.put("/add-comment", requireSignin, addComment);
router.put("/remove-comment", requireSignin, removeComment);
router.get("/total-posts", totalPost);
router.get("/posts", posts);
router.get("/post/:_id", getPost);

//admin
router.delete("/admin/delete-post/:_id", requireSignin, isAdmin, deletePost);
module.exports = router;
