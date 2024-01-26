import { useSelector } from 'react-redux'
import parse from 'html-react-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom"





function MyBlogs() {
  
  let blogCounter = useSelector(state => state.authSlice.blogData)
  return (
    <div className="bg-slate-50 my-[1vh] px-[1vw] py-[1vh]  max-h-[78vh] h-[78vh] flex-col mr-[4vw] overflow-y-scroll flex">
      <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-x-[2.5vw] gap-y-[5vh]'>
        {
        
        blogCounter.map((blog)=>{
          return <div key={`${blog._id}`} className='flex flex-col border-2 border-black rounded-md p-4 bg-white'>
            <div className='h-[20vh] w-[20vh] max-w-[30vw] bg-cover self-center bg-center' style={blog.blogImg?{backgroundImage:`url(${blog.blogImg})`}:{backgroundImage:`url(../src/assests/Default_profile.jpg)`}}></div>
            <b className='self-center'>{blog.title}</b>
            <div className='overflow-hidden overflow-y-clip h-[7vh]'>{parse(blog.content)}</div>
          </div>
        })
        }
      </div>
      <NavLink to={"/blogcreate"}>
          <button className="absolute bottom-[7.5vh] h-[7.5vh] w-[7.5vh] right-[5vw] z-10 m-[1vh] bg-mainBlue rounded-full hover:opacity-90">
          <FontAwesomeIcon icon={faPlus} size="2xl" style={{color: "#ffffff",}} />
          </button></NavLink>
          </div>
  )
}

export default MyBlogs