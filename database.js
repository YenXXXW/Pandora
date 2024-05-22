import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABSE
}).promise()


const getPosts = async() => {
    const [posts] = await pool.query("SELECT * FROM posts")
    return posts
}

const posts =await getPosts()
console.log(posts)