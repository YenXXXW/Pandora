import * as postControllers from "../controllers/posts"
import express from "express"

const router = express.Router()

router.get("/posts", postControllers.getPosts);

export default router