import pool from "../../database.js"

export const getPosts = async(req, res, next) => {
    const userId = req.user.id
    try {
        const [posts] = await pool.query("SELECT * FROM POSTS WHERE user_id = ?", [userId])
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
    const user_id = req.user.id
    try{
        if(!title || !content || !user_id) throw Error("Please fill the requied paraemeters")

        const [result] = await pool.query(`INSERT INTO POSTS (title, content, user_id) VALUES ( ?, ?, ?)`, [title, content, user_id])
        const id = result.insertId
        res.status(201).json({message: "post created successfully"})
    } catch(error) {
        next(error)
    }
    
}

export const updatePost = async (req, res, next) => {
    const title = req.body.title;
    const content  = req.body.content
    const user_id = req.user.id
    const postId = req.params.postId

    try{
        if(!title || !content || !user_id || !postId) throw Error("Please fill the requied paraemeters")

        const [result] = await pool.query(`UPDATE POSTS SET title = ?, content = ?, user_id = ? WHERE id = ?`, [title, content, user_id, postId]);
        const id = result.insertId
        res.status(201).json({message: "post updated successfully"})
    } catch(error) {
        next(error)
    }
}

export const deletePost = async (req, res, next) => {
    const postId = req.params.postId

    try{
        if(!postId) throw Error("Please fill the requied paraemeters")

        const [result] = await pool.query(`DELETE FROM POSTS WHERE id = ?`, [postId]);
        const id = result.insertId
        res.status(201).json({message: "post deleted successfully"})
    } catch(error) {
        next(error)
    }
}
