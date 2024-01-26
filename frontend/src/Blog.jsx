import {Footer,MyBlogs,UserBar,UserBlogOption } from "./componenets/index.js"
import { useEffect } from "react";
import {blogsStorage} from "./store/authSlice.js"
import getUser from "./utils/get.js";
import {useLocation,Outlet,useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import axios from "axios"
import UserNav from "./componenets/UserPage/UserNav.jsx";


function Blog() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let location = useLocation();

  useEffect(() => {
    getUser(dispatch,navigate)
  }, [dispatch,navigate])

  useEffect(()=>{
    axios.get("/api/v1/blog/getAllBlogs")
    .then((blogdata)=>{
      dispatch(blogsStorage({blogData:blogdata.data.data}))
    })
  },[dispatch])

  
  const layoutChanger =  ()=>{
    if(location.pathname == "/user"){
      return <MyBlogs/>
    }
    else{
      return <Outlet/>
    }
  }

  return (
    <div  className="flex flex-col">
      <UserNav/>
      <div className="flex"><UserBar/>
      <div className="flex flex-col">
        <UserBlogOption/>
        {layoutChanger()}
      </div>
      
      </div>
      
      <Footer/>
    </div>
  )
}

export default Blog