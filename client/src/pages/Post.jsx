import { useEffect, useState } from "react";
import { useGetPostbyIdQuery, useUpdatePostMutation } from "../features/postsApiSlice"
import { useParams } from "react-router-dom";



export default function Post() {
    const { id } = useParams();

    const { data, error, isLoading } = useGetPostbyIdQuery(id)
    const [update, { isLoadingUpdate }] = useUpdatePostMutation()

    const [title ,setTitle] = useState("")
    const [content, seContent]= useState("")
    const [success, setSuccess] = useState(false)



    useEffect(() => {
        if(data) {
        
            setTitle(data[0].title)
            seContent(data[0].content)
        }
        
    }, [data])

    const handleSubmit = async(e, id) => {
        e.preventDefault()
        try{
            const data = {
                title, 
                content
            }
            const res = await update({data, id}).unwrap()
            if (res.message === "post updated successfully") {
                setSuccess(true)
            }


        } catch (error) {
            console.log(error)
        } finally {
            setTitle("")
            seContent("")
        }

    }
    if (isLoading) {
        return (
        <span className="loading loading-dots loading-lg"></span>
        )
    }
    


  if(error) {
    return (
      <p>Something went wrong!!</p>
    )
  }
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
  
      <div className="flex flex-col gap-3 w-[300px] mx-auto">
      {
        data && (
          
         <form onSubmit={(e) => handleSubmit(e, id)} className="flex flex-col gap-3 border-gray-300 px-10 py-5 border-[1px]">
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input name="content" value={content} onChange={(e) => seContent(e.target.value)}/>
            <button className="bg-green-400 py-1 rounded-md">Update {isLoadingUpdate ? <span className="loading loading-spinner loading-sm"></span> : <></> }</button>
         </form>
        
        
        )
      }
      { success && <div>
        <p className="bg-green-500 py-1">post updated successfully</p>
        <a href="/posts"><p className="bg-green-500 py-1 mt-2">Back</p></a>
        </div>}
      </div>
     
      
    </div>
  )
}
