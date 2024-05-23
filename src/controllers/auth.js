import pool from "../../database.js"
import dotenv from 'dotenv'
import { genrateTokens } from "../utils/Authenticate.js"
import bcrypt from "bcrypt"

dotenv.config()


export const signup = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password 
    const username = req.body.username

    try{
        if(!email || !username || !password) {
            throw Error("All fields must be filled")
        }

        const [oldUser] = await pool.query(`SELECT * FROM USERS WHERE email = ?`, [email])
        if (oldUser.length > 0) {
            throw Error("User already exists")
        }

        const hashPassword = await bcrypt.hash(password, 10)
        
        const [result] = await pool.query(`INSERT INTO USERS (username, email, password) VALUES ( ?, ?, ?)`, [username, email, hashPassword])
        const [user] =  await pool.query(`SELECT * FROM USERS WHERE id = ?`, result.insertId)
        
        const tokens =await genrateTokens(user[0])
        
        req.user = user
        res.status(201).json(tokens)

    } catch (error) {
        next(error)
    }
}

export const login = async(req, res, next) => {
    const email = req.body.email
    const password = req.body.password 

    try{
        if(!email ||  !password) throw Error("fields must be filled")
        const [emailIndb] = await  pool.query(`SELECT * from users where email =?`, [email])
        const user = emailIndb[0]
        if (!user) {
            res.status(401).json({message: "Unauthorized"})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        
        if(!passwordMatch) {
            res.status(401).json({message: "Unauthorized"})
        }
        
        const tokens =await genrateTokens(user)
        req.user = user
        res.json(tokens)
    } catch(error) {
        next(error)
    }

}

export const logout = async (req, res, next) => {
    const refreshToken = req.body.refreshToken

    try {
        
        if (!refreshToken){
            throw Error("INVALID CREDENTIALS")
        }        

        await pool.query(`DELETE from REFRESH_TOKENS WHERE token = ?`, [refreshToken])
        res.json({"message": "logged out successfully"})

    } catch (error) {
        next(error)
    }
    
}