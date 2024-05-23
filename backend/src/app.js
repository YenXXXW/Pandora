import express from 'express'
import dotenv from 'dotenv'
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import morgan from 'morgan'
import  { authenticateTokens } from "./utils/Authenticate.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use(morgan("dev"))

const port = process.env.MYSQL_PORT



app.get("/", (req, res, next) => {
    res.send("hello")
})

app.use("/api/posts",authenticateTokens,  postRoutes)

app.use("/api/auth", authRoutes)


app.use((req, res, next) => {
    next(Error("endpoint not found"))
})

// next() needed that next recognizes the following as error handler
app.use((error, req, res, next) => {
    console.log(error)
    let errorMessage = 'An unknowned error occured'
    if (error instanceof  Error) errorMessage  = error.message
        
    res.status(500).json({error : errorMessage})
    
})


app.listen(port, () => {
    console.log("server running on port: ", port)
})

