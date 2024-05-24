import Navbar from './components/Navbar'
import {Routes , Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import Posts from './pages/Posts'
import Post from './pages/Post'
import CreatePost from './pages/CreatePost'

function App() {


  return (
    
    <main className="w-full px-[5%]">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/posts"} element={<Posts />} />
        <Route path={"/posts/:id"} element={<Post />} />
        <Route path={"/createPost"} element={<CreatePost />} />
      </Routes>
    </main>
  )
}

export default App
