import ReactDOM from 'react-dom/client'
import './index.css'
import { Following, Global } from './componenets/index.js'
import { Provider } from "react-redux"
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements} from "react-router-dom"
import App from "./App.jsx"
import { RegisterPage, LoginPage, BlogCreate,Blogshow,BlogUpdate } from "./pages/pages.index.jsx"
import 'react-toastify/dist/ReactToastify.css';
import Blog from './Blog.jsx'
import { UpdateAvatar, ChangePassword, DeleteAccount, UpdateDetails } from './componenets/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} >
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>
      
      <Route path='/user' element={<Blog />} >
        <Route path='/user/updateAvatar' element={<UpdateAvatar />} />
        <Route path='/user/changePassword' element={<ChangePassword />} />
        <Route path='/user/deleteAccount' element={<DeleteAccount />} />
        <Route path='/user/updateDetails' element={<UpdateDetails />} />
        <Route path='/user/Following' element={<Following />} />
        <Route path='/user/Global' element={<Global />} />
      </Route>
        <Route path='/blog/:owner/:blogId' element = {<Blogshow/>} />
        <Route path='/blog/update/:blogId'element = {<BlogUpdate/>} />
        <Route path='/blog/create' element={<BlogCreate />} />

    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
