import {useState} from 'react'
import { useCreatePostMutation } from '../features/postsApiSlice'

export default function CreatePost() {
    const [title ,setTitle] = useState("")
    const [content, seContent]= useState("")

    const [createPost , {isLoading}] = useCreatePostMutation()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            await createPost({title, content}).unwrap()
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
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title'/>
            <input name="content" value={content} onChange={(e) => seContent(e.target.value)} placeholder='content'/>
            <button className="bg-green-400 py-1 rounded-md">Create {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <></> }</button>
        </form>
    </div>
  )
}
