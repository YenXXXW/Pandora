import * as postControllers from "../controllers/posts.js"
import express from "express"

const router = express.Router()

router.get("/", postControllers.getPosts);

router.get("/:postId", postControllers.getPost)

router.post("/post", postControllers.createPost)

router.put("/:postId", postControllers.updatePost)

router.delete("/:postId", postControllers.deletePost)



export default router