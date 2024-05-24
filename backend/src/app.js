import express from 'express'
import dotenv from 'dotenv'
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import morgan from 'morgan'
import protect from './middleware/authenticate.js'
import cookieParser from 'cookie-parser'
import cors from "cors";
import createHttpError, {isHttpError} from 'http-errors'


dotenv.config()

const app = express()

app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  );

app.use(express.json())

app.use(cookieParser())

app.use(morgan("dev"))



const port = process.env.MYSQL_PORT



app.get("/", (req, res, next) => {
    res.send("hello")
})

app.use("/api/posts" , protect, postRoutes)

app.use("/api/auth", authRoutes)


app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"))
})

// next() needed that next recognizes the following as error handler
app.use((error, req, res, next) => {
    let errorMessage = 'An unknowned error occured'
    let statusCode = 500
    if (isHttpError(error)){
        statusCode = error.status
        errorMessage = error.message
    }
        
    res.status(statusCode).json({error : errorMessage})
    
})


app.listen(port, () => {
    console.log("server running on port: ", port)
})

