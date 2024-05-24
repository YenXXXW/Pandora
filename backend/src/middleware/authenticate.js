import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import pool from "../../database.js"

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  const email = req.body.email

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const [user] = await  pool.query(`SELECT * from users where email =?`, [email])
        console.log("good")
      req.user = user[0]
      next();
    } catch (error) {
      next(error)
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export default protect