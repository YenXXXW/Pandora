import * as authControllers from "../controllers/auth.js"
import express from "express"

const router = express.Router()

router.post("/login", authControllers.login);



export default router