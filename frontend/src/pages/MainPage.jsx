import { useEffect, useState, } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { FunctionBTN } from '../componenets/index.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import { useNavigate,Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar' 
import  getUser  from "../utils/get.js"
import { NavLink } from "react-router-dom"

function MainPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [MyBlogs,setMyBlogs] = useState(1)
  const [Following,setFollowing] = useState(0)
  const [Global,setGlobal] = useState(0)
  const [progress,setProgress] = useState(0)

  

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

  const handleLogOut = ()=>{
    axios.get('/api/v1/user/logout')
    .then(()=>{
      toast.success("User logged out success fully")
      setTimeout(() => {
        navigate("/login")
      }, 1000);
      
    })
    .catch(()=>{
      toast.error("Something Went wrong")
    })
  }

  
  useEffect(() => {
    getUser(dispatch,navigate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  let counter = (useSelector(state => state.authSlice.userData))
  
  const nameArray = counter?.data.fullName.split(" ")

  return (
    <div className="min-h-[96.5vh] min-w-full">
      <LoadingBar
        color='#B19CD9'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="min-w-full h-[10.5vh] min-h-7 bg-mainBlue flex justify-end">
        <div className=' flex flex-wrap-reverse'>
          <div className='self-center  font-bold font-sans text-[3vh] mx-[1vw] text-white'>Welcome <span className='text-white '>{counter?.data ? nameArray[0] : "user"}</span></div>
          <Link to={`/user/updateAvatar`}><div className='cursor-pointer self-center h-[13vh] w-[13vh] bg-white rounded-full bg-cover hover:opacity-65' style={counter?.data?.avatar ? { backgroundImage: `url(${counter.data.avatar})` } : { backgroundImage: `url(../src/assests/Default_profile.jpg)` }}></div></Link>
        </div>

      </div>
      <div className='bg-mainBlue h-[1vh] min-w-full'><div className='bg-black h-[1vh] w-[77.5vw] float-right rounded-s-full'></div></div>
      <div className='flex'>
        <div className='flex'>
          <div className='bg-mainBlue min-h-full scale-x-115 w-[15vw] h-[85.2vh] rounded-br-[15vh]'>
            <div className='flex flex-col justify-center items-center'>
              <div className='h-[10vh]'></div>
              <Link to={`/user/updateAvatar`}><div className='my-[1.5vh] w-[14vw] cursor-pointer'><FunctionBTN type="Update Avatar" color="white" txtColor="black" /></div></Link>
              <Link to={`/user/updateDetails`}><div className='my-[1.5vh] w-[14vw] cursor-pointer'><FunctionBTN type="Update Details" color="white" txtColor="black" /></div></Link>
              <Link to={`/user/changePassword`}><div className='my-[1.5vh] w-[14vw] cursor-pointer'><FunctionBTN type="Change Password" color="white" txtColor="black" /></div></Link>
              <div className='h-[7.5vh]'></div>
              <div className='my-[1.5vh] w-[14vw] cursor-pointer' onClick={handleLogOut}><FunctionBTN type=" Logout" color="black" txtColor="white" /></div>
              <Link to={`/user/deleteAccount`}><div className='my-[1.5vh] w-[14vw] cursor-pointer' ><FunctionBTN type="Delete Account" color="black" txtColor="white" /></div></Link>
            </div>
          </div>
          <div className='bg-mainBlue'><div className='bg-white w-[7.5vw] h-[100%] rounded-tl-[50vh]'></div></div>
        </div>
        <div className=' w-[77.5vw] flex flex-col'>
          <ul className='flex justify-around '>
            <li onClick={clickedMyBlogs} className={`cursor-pointer ${MyBlogs?"border-b-[0.5vh]":""} border-orange-500`}>My Blogs</li>
            <li onClick={clickedFollowing} className={`cursor-pointer ${Following?"border-b-[0.5vh]":""} border-orange-500`}>Following</li>
            <li onClick={clickedGlobal} className={`cursor-pointer ${Global?"border-b-[0.5vh]":""} border-orange-500`}>Global</li>
          </ul>
          <div className="bg-slate-50 my-[1vh] px-[1vw] py-[1vh]  max-h-[78vh] flex-col mr-[4vw] overflow-y-scroll flex">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quam maiores nulla sed asperiores tempora adipisci ab facilis recusandae aspernatur laudantium, possimus explicabo odit. Fugiat consequatur libero, voluptatum atque laborum porro ullam velit, commodi dignissimos adipisci accusamus voluptatibus dolores nihil voluptate nesciunt provident nisi natus aut beatae laboriosam praesentium officia. Eius consequuntur error ducimus doloribus! Id amet neque iure distinctio impedit tempore, earum quas sit. Minima, voluptates! Rerum, mollitia dicta. Culpa maiores itaque doloribus sunt nisi mollitia nihil, ratione eveniet qui dicta et corrupti quis suscipit quos quae nam, aliquam quam debitis veritatis blanditiis sapiente incidunt beatae libero. Inventore, numquam. Corporis esse eveniet fugiat tempora nam exercitationem hic sit atque nostrum nisi consequatur, voluptates fuga distinctio, numquam suscipit cum sed facere ratione in eius commodi magnam inventore sapiente. Quam possimus dicta ab iusto voluptatibus exercitationem libero omnis, in veniam excepturi. Blanditiis dolores cumque non magnam incidunt ad deserunt doloribus vel soluta velit! Quo, ducimus corrupti. Maxime natus asperiores iure doloremque quia excepturi itaque dolores voluptatem voluptas. Dolorem, voluptatem vero quo cupiditate laudantium commodi quod. Dignissimos corporis inventore autem illo quo dolor obcaecati fugit aperiam quos unde. Omnis ab voluptatibus, asperiores eveniet, quidem amet voluptas consequatur veniam magni aut, illum impedit odit. Impedit, harum? Repellat aperiam maiores laudantium quidem accusantium facilis, pariatur eius dolore omnis sit sequi similique aliquid sint tempora, esse aut ab quisquam amet voluptate quaerat doloribus ducimus deleniti? Nihil atque eius commodi vitae quaerat nobis expedita placeat consequuntur, quibusdam odit reiciendis beatae accusamus mollitia et magni, maiores amet veniam, sequi ad distinctio in non dolore! Inventore nostrum tenetur, illum necessitatibus labore quas ea provident optio delectus officia. Rem velit, voluptates quam, laboriosam ex ad veniam officia ipsam nam provident blanditiis quibusdam molestias enim ducimus? Odit, mollitia placeat aspernatur sunt provident laboriosam obcaecati at commodi velit nemo perferendis exercitationem voluptates accusantium iste fugit quaerat doloremque itaque doloribus suscipit nesciunt delectus. Ad quidem quis repudiandae facere harum alias aperiam a nisi magni. Reprehenderit, cupiditate repudiandae provident dignissimos expedita cum repellendus culpa illo debitis autem quis unde nostrum magnam accusamus incidunt dicta at deleniti ullam nobis doloremque optio. Placeat itaque numquam aut, ratione laborum vitae ut cum quasi soluta sequi nihil, repellendus dicta? Ea ab soluta, accusantium ex illo reiciendis? Sunt dolor distinctio, placeat amet pariatur ea velit maxime reprehenderit. Rerum voluptas ratione suscipit vitae eius dolorem non sit ullam! Expedita laudantium quis recusandae nihil voluptatibus nostrum fugiat sit obcaecati impedit.
          </div>
          <NavLink to={"/blogcreate"}>
          <button className="absolute bottom-[7.5vh] h-[7.5vh] w-[7.5vh] right-[5vw] z-10 m-[1vh] bg-mainBlue rounded-full hover:opacity-90">
          <FontAwesomeIcon icon={faPlus} size="2xl" style={{color: "#ffffff",}} />
          </button></NavLink>
        </div>

      </div>
      <ToastContainer/>
    </div>
  )
}

export default MainPage