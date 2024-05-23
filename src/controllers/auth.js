import pool from "../../database.js"
import dotenv from 'dotenv'
import { genrateTokens } from "../utils/Authenticate.js"

dotenv.config()


export const login = async(req, res, next) => {
    const email = req.body.email
    const password = req.body.password 

    try{
        if(!email ||  !password) throw Error("fields must be filled")
        const [emailIndb] = await  pool.query(`SELECT * from users where email =?`, [email])
        const user = emailIndb[0]
        if (!user) res.status(401).json({message: "Unauthorized"})
        if(password !== user.password) res.status(401).json({message: "Unauthorized"})
        
        const tokens =await genrateTokens(user)
        req.user = user
        console.log(tokens)
        res.json(tokens)
    } catch(error) {
        next(error)
    }

}