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



const getPost = async(id) => {
    const [post] = await pool.query(`SELECT * FROM posts WHERE id = ?`, [id])
    return post[0]
}


const createPost = async ( title, content, user_id) => {
    const [result] = await pool.query(`INSERT INTO POSTS (title, content, user_id) VALUES ( ?, ?, ?)`, [title, content, user_id])
    const id = result.insertId
    console.log(id)
    return getPost(id)
}

const post =await createPost('test2', 'testing2', 1)
console.log(post)

