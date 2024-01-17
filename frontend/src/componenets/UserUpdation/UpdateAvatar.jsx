import { Link } from "react-router-dom"
import {useSelector} from "react-redux"
import { useState, useRef, useEffect } from "react";
import {FunctionBTN} from "../index.js"
export default function UpdateAvatar() {
  const [img,setImg] = useState("../src/assests/Default_profile.jpg")
  let counter = (useSelector(state => state.authSlice.userData))
  useEffect(()=>{
    if(counter.data.avatar){
      setImg(counter.data.avatar)
    }
  },[])
    
  
  const inputRef = useRef(null)
  const [image, setImage] = useState("")
  const handleClick = () => {
    inputRef.current.click();
  }
  const handleChange = (event) => {
    console.log(event.target.files[0], "hello")
    setImage(event.target.files[0])
  }
  return (
    <div className="min-h-screen min-w-[87.2vw] right-0 absolute flex items-center justify-center">

      <div className="bg-slate-50 h-[50vh] w-[70vw] rounded-lg border-black border-2 font-extrabold font-mono"><div className="float-right p-[2vh]"><Link to={"/user"}>X</Link></div>
        <div className="m-[3%] flex flex-col items-center justify-center"  >
            <div onClick={handleClick} className=' h-[25vh] w-[25vh] rounded-full bg-cover hover:opacity-50' style={image ? { backgroundImage: `url(${URL.createObjectURL(image)})` } : { backgroundImage: `url(${img})` }}></div>
            <input type="file" ref={inputRef} onChange={handleChange} style={{ display: "none" }} accept="image/png, image/jpeg, image/jpg , image/webp" />
            <div className="my-[3ch] w-[7vw] flex items-center justify-center text-[5vh]"><FunctionBTN type = " Update " color="black" txtColor="white"  /></div>
        </div>
          
      </div>
    </div>
  )
}
