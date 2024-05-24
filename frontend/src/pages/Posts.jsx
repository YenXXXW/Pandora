import { useDeletePostMutation, useGetPostsQuery } from "../features/postsApiSlice"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Posts() {

  const { userInfo } = useSelector((state) => state.auth);

  const { data, error, isLoading } = useGetPostsQuery()

  const [deletePost , {deleteLoaing}]= useDeletePostMutation()

  const navigate = useNavigate()



  useEffect(() => {
      if(!userInfo) {
        navigate("/login")
      } 
    }, [])



  const handleClick = (id) => {
    navigate(`/posts/${id}`)
  }

  const handleDelete = async (id) => {
    try{
      await deletePost(id)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return (
      <span className="loading loading-dots loading-lg"></span>
    )
  }


  if(error) {
    return (
      <p className="mt-[20vh]"> Something Went Wrong !!!</p>
    )
  }

  
  return (
    <div>
  
      <a href="/createPost"><button className="bg-yellow y-1">Create A Post + </button></a>
      <div className="flex flex-col gap-3 w-[300px] md:w-[70%] mx-auto mt-10">
      {
        data && data.map(post => (
          <div key={post.id } className="border-[1px] border-slate-300"> 
          <div className="bg-yellow-300">
            <p className="uppercase py-2">{post.title}</p>
          </div>
          <p className="py-4">{post.content}</p>
          <div>
            {
              userInfo.id === post.user_id && (<div className="text-sm flex justify-between px-2 mb-2 text-white">
                <button className="bg-red-500 py-1 px-2" onClick={() => handleDelete(post.id)}>DELETE{deleteLoaing ? <span className="loading loading-spinner loading-sm"></span> : <></> }</button>
                <button className="bg-green-500  py-1 px-2" onClick={() => handleClick(post.id)}>UPDATE</button>
                </div>)
            }
          </div>
        </div>
        ))
      }
      </div>
      
    
    </div>
  )
}
