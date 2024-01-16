import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux"
import store from "./store/store.js"
import {RouterProvider, createBrowserRouter, Route,createRoutesFromElements,redirect} from "react-router-dom" 
import App from "./App.jsx"
import {RegisterPage,LoginPage} from "./pages/pages.index.jsx"
import 'react-toastify/dist/ReactToastify.css';
import Blog from './Blog.jsx'


redirect("/Register")
const router = createBrowserRouter(
  createRoutesFromElements( 
    <>
    <Route path='/' element={<App/>} >
        <Route path='/Register' element = {<RegisterPage/>}  />
        <Route path='/Login' element = {<LoginPage/>}  />
    </Route>
    <Route path='/user' element={<Blog/>} >
    </Route></>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
      <RouterProvider router = {router}/>
    </Provider>
)
