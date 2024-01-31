import { useSelector } from 'react-redux'
import parse from 'html-react-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from "react-router-dom"





function MyBlogs() {

  let blogCounter = useSelector(state => state.authSlice.blogData)
  return (
    <>
      <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-x-[2.5vw] gap-y-[5vh] bg-slate-50 px-[2vw] py-[1vh] h-[80vh] mx-[1vw] overflow-y-scroll'>
        {

          blogCounter.map((blog) => {
            return blog?(
            <Link to={`/blog/1/${blog._id}`} key={`${blog._id}`} className='flex flex-col border-2 border-black rounded-md p-4 bg-white h-[35vh]'>
                <div className='h-[20vh] w-[20vh] max-w-[30vw] bg-cover self-center bg-center' style={blog.blogImg ? { backgroundImage: `url(${blog.blogImg})` } : { backgroundImage: `url(https://res.cloudinary.com/mohitproject/image/upload/v1706437260/Assets/dfx6zvd7elnqlyaa4cxi.png)` }}></div>
                <b className='self-center font-serif'>{blog.title}</b>
                <div className='text-opacity-80 text-gray-800 text-xs'>{blog.createdAt.slice(0,10)}</div>
                <div className='overflow-hidden overflow-y-clip h-[7vh] py-1'>{parse(blog.content)}</div>
            </Link>
            ):(null)
          })
        }
      </div>
      <div className='absolute bottom-[2.5vh] right-[5vw]'>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLScLCP-vIpmF3VHgQSehLn6-aIUNfhvlzp3eeyn5QFe3cAHYFA/viewform?usp=sf_link"  target="_blank" rel="noreferrer" ><button className="h-[5vmin] w-[10vmin] z-10 m-[1vh] bg-black text-white text-[2vmin] font-serif font-medium rounded-full hover:opacity-90">
        Feedback
      </button></a>
      <NavLink to={"/blog/create"}>
        <button className="h-[7.5vmin] w-[7.5vmin] z-10 m-[1vh] bg-mainBlue rounded-full hover:opacity-90">
          <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: "#ffffff", }} />
        </button>
        </NavLink>
        </div>
      
    </>
  )
}

export default MyBlogs