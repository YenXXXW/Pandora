import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import pool from "../../database.js"

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;


  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = {
        id: decoded.userId.id,
        email: decoded.userId.email,
        username: decoded.userId.username
      }
      req.user = user

      next()
    } catch (error) {
      next(error)
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export default protect