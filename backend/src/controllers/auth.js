import pool from "../../database.js"
import dotenv from 'dotenv'
import generateToken from "../utils/generateToken.js"
import bcrypt from "bcrypt"
import createHttpError from "http-errors"

dotenv.config()


export const signup = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password 
    const username = req.body.username

    try{
        if(!email || !username || !password) {
            throw createHttpError(400, "All fields must be filled")
        }

        const [oldUser] = await pool.query(`SELECT * FROM USERS WHERE email = ?`, [email])
        if (oldUser.length > 0) {
            throw createHttpError(409, "user aleady exits")
        }

        const hashPassword = await bcrypt.hash(password, 10)
        
        const [result] = await pool.query(`INSERT INTO USERS (username, email, password) VALUES ( ?, ?, ?)`, [username, email, hashPassword])
        const [user] =  await pool.query(`SELECT * FROM USERS WHERE id = ?`, result.insertId)
        generateToken(res, user);

        const usercreated =  user[0]
        console.log(usercreated)
        req.user = usercreated
        res.json({
            username : usercreated.username,
            email: usercreated.email
        })

    } catch (error) {
        next(error)
    }
}

export const login = async(req, res, next) => {
    const email = req.body.email
    const password = req.body.password 

    try{
        if(!email ||  !password){
            throw createHttpError(400, "All fields must be filled")
        } 
        const [emailIndb] = await  pool.query(`SELECT * from users where email =?`, [email])
        const user = emailIndb[0]
        if (!user) {
            throw createHttpError(401, "Unauthorized")
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        
        if(!passwordMatch) {
            throw createHttpError(401, "Unauthorized")
        }
        
        generateToken(res, user)
        req.user = user
        res.json({
            username : user.username,
            email: user.email
        })
    } catch(error) {
        next(error)
    }

}

export const logout = async (req, res, next) => {
    try{
      res.cookie('jwt', '', {
          httpOnly: true,
          expires: new Date(0),
        });
        res.status(200).json({ message: 'Logged out successfully' });
        
    }
    catch (error) {
        next(error)
    }
        
    
}