import jwt from "jsonwebtoken";
import pool from "../../database.js"

//middleware to check whether the user has authenticated
export async function authenticateTokens (req, res, next) {
    const authHeader = req.headers.authorization
    try{
        if(!authHeader) {
            res.status(401).json({message: "Unauthorized"})
        }
        const access_token = authHeader.split(" ")[1];
        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
        
        
    } catch(error) {
        if(error.message === "jwt expired"){
            authenticateRefreshToken(req, res, next)
            
        } else {
            next(error)
        }
       
    }
}

async function authenticateRefreshToken(req, res, next) {
    const refreshToken = req.body.refreshToken

    try {
        

        if (!refreshToken){
            throw Error("INVALID CREDENTIALS")
        }
        const [tokens] = await pool.query("SELECT * FROM REFRESH_TOKENS")
        

        const tokenExists = tokens.some(token => token.token === refreshToken) 
        if(!tokenExists) {
            throw Error("INVALID CREDENTIALS")
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        req.user = decoded.user
        generateAccessToken(decoded.user)

    } catch (error) {
        if(error.message === "jwt expired"){
            await pool.query(`DELETE from REFRESH_TOKENS WHERE token = ?`, [refreshToken])
            res.status(401).json({"message": "Please login again"})
            
        }
        next(error)
    }
    
    
}



export function generateAccessToken(user) {

  const accessToken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
  );

  return accessToken;
}

export function generateRefreshToken(user) {
  const refreshToken = jwt.sign({ user: user }, process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );

  return refreshToken;
}

export async function genrateTokens(user) {
  
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await pool.query(`INSERT INTO REFRESH_TOKENS (token) VALUES(?)` , [refreshToken])

  return({
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
}