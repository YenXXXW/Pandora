import pool from "../../database.js"

export const getPosts = async(req, res, next) => {
    try {
        const [posts] = await pool.query("SELECT * FROM posts")
        res.json(posts)
    }
    catch (error) {
        next(error)
    }
}


export const getPost = async(req, res, next) => {

    const id = req.params.postId
    try {
        if(!id) throw Error("Please fill the requied paraemeters")

        const [post] = await pool.query(`SELECT * FROM posts WHERE id = ?`, [id]) 
        res.json(post)
    }
    catch (error) {
        next(error)
    }
    
}


export const createPost = async (req, res, next) => {
    const title = req.body.title;
    const content  = req.body.content
    const user_id = req.body.user_id
    try{
        if(!title || !content || !user_id) throw Error("Please fill the requied paraemeters")

        const [result] = await pool.query(`INSERT INTO POSTS (title, content, user_id) VALUES ( ?, ?, ?)`, [title, content, user_id])
        const id = result.insertId
        res.status(201).json({message: "post created successfully"})
    } catch(error) {
        next(error)
    }
    
}