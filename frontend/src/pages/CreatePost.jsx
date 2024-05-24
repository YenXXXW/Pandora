import {useState, useEffect} from 'react'
import { useCreatePostMutation } from '../features/postsApiSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";


export default function CreatePost() {
    const [title ,setTitle] = useState("")
    const [content, seContent]= useState("")
    const [success, setSuccess] = useState(false)

    const [createPost , {isLoading}] = useCreatePostMutation()

    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo) {
          navigate("/login")
        } 
      }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const res = await createPost({title, content}).unwrap()
            if (res.message === "post created successfully") {
                setSuccess(true)
            }
           
        } catch (error) {
            console.log(error)
        } finally {
            setTitle("")
            seContent("")
        }
         
    }
    
  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3 border-gray-300 px-10 py-5 border-[1px] w-[300px] md:w-[500px] mx-auto mt-[15%]">
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title' required/>
            <input name="content" value={content} onChange={(e) => seContent(e.target.value)} placeholder='content' required/>
            <button className="bg-green-400 py-1 rounded-md">Create {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <></> }</button>
            { success && <div><p className="bg-green-500 py-1">post created successfully</p><a href="/posts"><p className="bg-green-500 py-1 mt-2">Back</p></a></div>}
        </form>
    </div>
  )
}
