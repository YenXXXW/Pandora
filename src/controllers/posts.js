import pool from "../../database"

export const getPosts = async(req, res, next) => {
    try {
        const [posts] = await pool.query("SELECT * FROM posts")
        res.json(posts)
    }
    catch (error) {
        next(error)
    }
}


export const getPost = async(id) => {
    try {
        const [post] = await pool.query(`SELECT * FROM posts WHERE id = ?`, [id]) 
        res.json(post)
    }
    catch (error) {
        next(error)
    }
    
}


export const createPost = async ( title, content, user_id) => {
    try{
        const [result] = await pool.query(`INSERT INTO POSTS (title, content, user_id) VALUES ( ?, ?, ?)`, [title, content, user_id])
        const id = result.insertId
        console.log(id)
        res.json(getPost(id))
    } catch(error) {
        next(error)
    }
    
}