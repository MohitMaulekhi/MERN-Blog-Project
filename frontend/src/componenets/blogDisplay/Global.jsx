/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import axios from "axios"
import parse from "html-react-parser"
import LoadingBar from 'react-top-loading-bar'

function Global() {
  const [page, setPage] = useState(0);
  const [blogCounter, setBlogCounter] = useState([]);
  const [progress, setProgress] = useState(0);
  const getData = async () => {
    setProgress(20)
    axios.get(`/api/v1/blog/getGlobal/page/${page}`,{
      withCredentials:true,
    })
    .then((data)=>{
      setBlogCounter((prev) => [...prev, ...data.data.data])
    })
    .finally(setProgress(100))
  };

  const handelInfiniteScroll = () => {
      if (
        document.getElementById("parentScroll").offsetHeight + document.getElementById("parentScroll").scrollTop + 1 >
        document.getElementById("parentScroll").scrollHeight
      ) {
        setPage(page+1);
      }
  }
  useEffect(() => {
    document.getElementById("parentScroll").addEventListener("scroll",handelInfiniteScroll)
    getData();
  }, [page]);
  
  return (
    <>
      <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-x-[2.5vw] gap-y-[5vh] bg-slate-50 px-[2vw] py-[1vh] h-[80vh] mx-[1vw] overflow-y-scroll' id="parentScroll">
      <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        {

          blogCounter?.map((blog) => {
            return blog?(
            
              <Link to={`/blog/0/${blog._id}`} className='flex flex-col border-2 border-black rounded-md p-4 bg-white h-[35vh]'>    
                <div className='h-[20vh] w-[20vh] max-w-[30vw] bg-cover self-center bg-center' style={blog.blogImg ? { backgroundImage: `url(${blog.blogImg})` } : { backgroundImage: `url(https://res.cloudinary.com/mohitproject/image/upload/v1706437260/Assets/dfx6zvd7elnqlyaa4cxi.png)` }}></div>
                <b className='self-center font-serif'>{blog.title}</b>
                <div className="flex w-[80%] justify-between flex-wrap">
                <div className='text-opacity-80 text-gray-800 text-xs mr-10'>{blog.createdAt.slice(0,10)}</div>
                <div className='text-opacity-80 text-gray-800 float-right text-xs '>{blog.author}</div>
                </div>
                <div className='overflow-hidden overflow-y-clip h-[7vh] py-1'>{parse(blog.content)}</div>       
              </Link>
            
            ):(null)
          })
        }
      </div>
    </>
  )
}

export default Global