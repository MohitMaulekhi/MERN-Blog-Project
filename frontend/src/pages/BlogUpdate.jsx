import { Editor } from '@tinymce/tinymce-react';
import { useState,useRef, useEffect } from 'react';
import { FunctionBTN } from '../componenets/index.js'
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar' 
import axios from "axios"
import {useNavigate,useParams} from "react-router-dom"


function BlogUpdate() {
  
  const [title,setTitle] = useState("")
  const [content, setContent] = useState("")
  const [blogImg, setblogImg] = useState("https://res.cloudinary.com/mohitproject/image/upload/v1706437260/Assets/wjaajuiwnuadcmllzhat.png")
  useEffect(()=>{
    axios.get(`/api/v1/blog/get/${params.blogId}`)
    .then((data)=>{
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
  })
  const [image, setImage] = useState("")
  const editorRef = useRef(null)
  const inputRef = useRef(null)
  const [progress,setProgress] = useState(0)
  const navigate = useNavigate()
  const params = useParams()
  const handleClick = () => {
    inputRef.current.click();
  }
  const handleChange = (event) => {
    setImage(event.target.files[0])
  }
  const clickedSubmit = ()=>{
    if(title === "" || editorRef.current.getContent() === ""){
      toast.warn("Title and content should not be empty")
      return
    }
    setProgress(20)
    const formData = new FormData();
    formData.append("title",title)
    formData.append("content", editorRef.current.getContent())
    if(image){
      formData.append("blogImg",image)
    }
    axios.post(`/api/v1/blog/update/${params.blogId}`,formData)
    .then(()=>{
      toast.success("Blog updated successfully")
      setTimeout(() => {
        navigate("/user")
      }, 1000);
    })
    .catch(()=>{
      toast.error("Something went wrong!! Try again later")
      setTimeout(() => {
        navigate("/user")
      }, 1000);
    })
    .finally(setProgress(100))
  }
  return (
    <div className="min-h-screen min-w-[100vw] flex justify-center items-center ">
      <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className='w-[90vw] border-black rounded-xl border-4 py-[2vh] px-[1vw]'>
        <div className='h-[8vh]'>
        <h6 className='font-bold text-[4vh]'>Title:- <input className='focus:outline-none border-black text-gray-900 border-b-4 w-[40vw] text-[3.5vh]' placeholder='Enter Title' type="text" value={title} onChange={(e)=>(setTitle(e.target.value))} /></h6>
        </div>
          <div className='my-[4vh]'><Editor
        apiKey= {import.meta.env.VITE_TINY_MCE_API_KEY}
        onInit={(evt,editor) => editorRef.current = editor}
        init={{
          menubar: false,
          plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        initialValue={content}
      /></div>
      <div className=" my-[1vh] w-[90vw]" >
          <button  onClick={handleClick}>
          <div className=' h-[13vh] w-[13vh]  bg-cover hover:opacity-50' style={image?{backgroundImage:`url(${URL.createObjectURL(image)})`}:{backgroundImage:`url(${blogImg})`}}></div>
            <input type="file" ref={inputRef} onChange={handleChange} style={{ display: "none" }} accept="image/png, image/jpeg, image/jpg image/webp" />
          </button>
          
        </div>
        <div className='flex cursor-pointer' onClick={clickedSubmit}><FunctionBTN type = "Submit" color="black" txtColor="white" /></div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default BlogUpdate