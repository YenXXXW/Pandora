import express from 'express'
import dotenv from 'dotenv'
import * as postControllers from "../controllers/posts"

dotenv.config()

const app = express()
const port = process.env.MYSQL_PORT



app.use((req, res, next) => {
    next(Error("endpoint not found"))
})

// next() needed that next recognizes the following as error handler
app.use((error, req, res, next) => {
    let errorMessage = 'An unknowned error occured'
    if (error instanceof  Error) errorMessage  = error.message
        
    res.status(500).json({error : errorMessage})
    
})


app.listen(port, () => {
    console.log("server running on port: ", port)
})

