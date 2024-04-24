
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Main_page from "./home/mainPage";
import Viewproject from "./home/components/viewproject";
import Add from "./home/add";
import Edit from "./home/edit";

const router=createBrowserRouter([
    {path:'/',element:<App/>},
    {path:'/login',element:<Login/>},
    {path:'/signup',element:<Signup/>},
    {path:'/home',element:<Main_page/>},
    {path:'/viewproject',element:<Viewproject/>},
    {path:'/add',element:<Add/>},
    {path:'/edit/:id',element:<Edit/>},
])
export default router;