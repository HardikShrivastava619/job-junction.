import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {  createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './router/Login/Login.jsx';
import Home from './router/Home/Home.jsx';
import Register from './router/Register/Register.jsx';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Jobs from './router/Jobs/Jobs.jsx';
import SearchResult from './router/SearchResult/SearchResult.jsx';
import MoreDetails from './router/MoreDetails/MoreDetails.jsx';
import MyPost from './router/MyPosts/MyPost.jsx';
import Chat from './router/Messages/Chat/Chat.jsx';
import Projects from './router/Projects/Projects.jsx';
import {Provider} from 'react-redux'
import finalStore from './store/index.js';
import JobForm from './router/JobForm/JobForm.jsx';
import JobDetails from './router/JobDetails/JobDetails.jsx';
import EnterpriseJobs from './router/Jobs/EnterpriseJobs.jsx';
import OtherUserPosts from './router/OtherUserRoutes/OtherUserPosts/OtherUserPosts.jsx';
import OtherUserProjects from './router/OtherUserRoutes/OtherUserProjects/OtherUserProjects.jsx';
import ApplicationPage from './router/ApplicationPage/ApplicationPage.jsx';
import NotifPost from './router/notfPost/NotifPost.jsx';


const router = createBrowserRouter([
{path : '/'  , element:<App/> , children:[
{path:'/' , element:<Home/>},
{path:'/Jobs' , element:<Jobs/>},
{path:'/SearchResult' , element:<SearchResult/>},
{path:'/MoreDetails/:id' , element:<MoreDetails/>},
{path:'/notifPost/:id/:pid' , element:<NotifPost/>},
{path:'/MyPost/:id' , element:<MyPost/>},
{path:'/Open_chat' , element:<Chat/>},
{path:'/Projects/:id' , element:<Projects/>},
{path:'/JobForm' , element:<JobForm/>},
{path:'/EnterpriseJobs' , element:<EnterpriseJobs/>},
{path:'/JobDetail/:jid' , element:<JobDetails/>},
{path:'/chat' , element:<Chat/>},
{path:'/OtherUserPosts/:id', element:<OtherUserPosts/> },
{path:'/OtherUserProjects/:id', element:<OtherUserProjects/> },
{path:'/applicantonPage', element:<ApplicationPage/> }

]},

{path:'/login' , element:<Login/>},
{path:'/Register' , element:<Register/>},







])



createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={finalStore} >
    <RouterProvider router={router}  />
  </Provider>

  </StrictMode>,
)
