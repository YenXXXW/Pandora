import * as authControllers from "../controllers/auth.js"
import express from "express"

const router = express.Router()

router.post("/login", authControllers.login);

router.post("/signup", authControllers.signup)

router.post("/logout", authControllers.logout)


export default router