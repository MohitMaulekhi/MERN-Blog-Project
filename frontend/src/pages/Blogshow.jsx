import {useParams,Link,useNavigate} from 'react-router-dom';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import { useState,useEffect } from 'react';
import parse from 'html-react-parser';
import LoadingBar from 'react-top-loading-bar'

function Blogshow() {
  const navigate = useNavigate()
  const [title,setTitle] = useState("")
  const [content, setContent] = useState("")
  const [blogImg, setblogImg] = useState("")
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(1)
  useEffect(()=>{
    setProgress(30)
    axios.get(`/api/v1/blog/get/${params.blogId}`)
    .then((data)=>{
      setProgress(70)
      setTitle(data.data.data.title)
      setContent(data.data.data.content)
      if(data.data.data.blogImg){
        setblogImg(data.data.data.blogImg)
      }
    })
    .catch(()=>{
      setTimeout(() => {
        toast.error("Invalid blog")
      }, 2000); 
      navigate("/user")
      
    })
    .finally(()=>{
      setProgress(100)
      setLoading(false)
    })
  },[navigate])

  const handleClickedDelete = ()=>{
    setProgress(20)
    axios.get(`/api/v1/blog/delete/${params.blogId}`)
    .then(()=>{
      setTimeout(() => {
        toast.success("Blog delted successfully")
      }, 2000);
      navigate("/user")
    })
    .catch(()=>{
      toast.error("Something went wrong")
    })
    .finally(setProgress(100))
  }
  const params = useParams()
  return !loading? (
    <div className='flex flex-col h-full border-4 rounded-md border-black m-[2vmin] p-[5vmin]'>
      <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <h1 className='text-[7.5vh] text-center font-serif' >{title}</h1>
        {blogImg?<img className='h-[37.5vmax] w-[50vmax] self-center' src={blogImg}/>:null}
        
        <div className='m-[2vmax]'>{parse(content)}</div>
        {params.owner == 1?<div className='flex justify-evenly mt-[3vh]'>
          <Link to = {`/blog/update/${params.blogId}`}><button className='bg-orange-400 h-[5vh] rounded-xl w-[15vw] hover:opacity-90'>Update</button></Link>
          <button onClick={handleClickedDelete} className='bg-black text-white h-[5vh] rounded-xl w-[15vw] hover:opacity-90' >Delete</button>
        </div>:null}
        <ToastContainer/>
    </div>
  ):null
}

export default Blogshow