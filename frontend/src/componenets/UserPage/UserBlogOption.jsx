import {Link } from "react-router-dom"
import { useEffect, useState } from "react"
import {useLocation} from "react-router-dom"

function UserBlogOption() {
    let location = useLocation()
    const [MyBlogs,setMyBlogs] = useState(1)
    const [Following,setFollowing] = useState(0)
    const [Global,setGlobal] = useState(0)
    useEffect(()=>{
      if(location.pathname != "/user"){
        setGlobal(1)
        setMyBlogs(0)
    }
    })
    
    const clickedMyBlogs = ()=>{
        setMyBlogs(1)
        setFollowing(0)
        setGlobal(0)
      }
      
      const clickedFollowing = ()=>{
        setFollowing(1)
        setGlobal(0)
        setMyBlogs(0)
      }
    
      const clickedGlobal = ()=>{
        setFollowing(0)
        setGlobal(1)
        setMyBlogs(0)
      }
  return (

        <ul className='flex justify-around w-[100%]'>
          <Link to={`/user`}><li onClick={clickedMyBlogs} className={`cursor-pointer ${MyBlogs?"border-b-[0.5vh]":""} border-orange-500`}>My Blogs</li></Link>
          {/* <Link to={`/user/Following`}><li onClick={clickedFollowing} className={`cursor-pointer ${Following?"border-b-[0.5vh]":""} border-orange-500`}>Following</li></Link> */}
          <Link to={`/user/Global`}><li onClick={clickedGlobal} className={`cursor-pointer ${Global?"border-b-[0.5vh]":""} border-orange-500`}>Global</li></Link>
        </ul>
  )
}

export default UserBlogOption

