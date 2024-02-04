import { useNavigate } from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { useState, useRef, useEffect } from "react";
import {FunctionBTN} from "../index.js"
import { ToastContainer, toast } from 'react-toastify'
import axios  from "axios";
import LoadingBar from 'react-top-loading-bar'
import  getUser from "../../utils/get.js";
import Container from "./Container.jsx"

export default function UpdateAvatar() {
  const [progress,setProgress] = useState(0)
  const [img,setImg] = useState("https://res.cloudinary.com/mohitproject/image/upload/v1706437249/Assets/ig1r0citioyfixiqzfvq.png")
  let counter = (useSelector(state => state.authSlice.userData))
  useEffect(()=>{
    if(counter?.data?.avatar){
      setImg(counter?.data?.avatar)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[counter])
    
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [image, setImage] = useState("")
  const handleClick = () => {
    inputRef.current.click();
  }
  const handleChange = (event) => {
    setImage(event.target.files[0])
  }
  const handleAvatarChange = ()=>{
    if (image) { 
      const formData = new FormData()
      formData.append("avatar", image);
      setProgress(30)
      axios.patch("/api/v1/user/update/avatar",formData,{
        withCredentials:true,
      })
      .then(()=>{
        toast.done("Profile updated")
        getUser(dispatch,navigate)
          
          // eslint-disable-next-line react-hooks/exhaustive-deps
        
      })
      .catch(()=>{
        toast.error("Something went wrong")
      })
      .finally(()=>{
        setProgress(100)
      })

    }
    else{
      toast.warning("Please input image before updating")
    }
}
  return (
    <>
      <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <Container type={
        <div className="flex flex-col items-center justify-center"  >
            <div onClick={handleClick} className=' h-[25vh] w-[25vh] rounded-full bg-cover hover:opacity-50' style={image ? { backgroundImage: `url(${URL.createObjectURL(image)})` } : { backgroundImage: `url(${img})` }}></div>
            <input type="image" ref={inputRef} onChange={handleChange} style={{ display: "none" }} accept="image/png, image/jpeg, image/jpg , image/webp" />
            <div className="mt-[5vh]" onClick={handleAvatarChange} ><FunctionBTN type = " Update " color="black" txtColor="white" width = "15vw"   /></div>
        </div>
      }/>
      <ToastContainer/>
    </>
  )
}
