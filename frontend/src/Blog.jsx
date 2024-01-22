import {Footer } from "./componenets/index.js"
import {Outlet} from "react-router-dom"
import {MainPage} from "../src/pages/pages.index.jsx"


function Blog() {

  
  return (
    <>
    <div  className="flex flex-col">
      <Outlet/>
      <MainPage/>
      <Footer/>
    </div>
    
    </>)
}

export default Blog