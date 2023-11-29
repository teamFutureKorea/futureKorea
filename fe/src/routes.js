import Oauth from "./page/Oauth";
import Login from "./page/Login";
import Detail from "./page/detail/Detail";
import Home from "./page/home/Home";
import List from "./page/list/List";

const routes = [
  {
    path: "/",
    component: <Home/>,
    isLogin:true
  },
  {
    path:"/list",
    component: <List/>,
    isLogin:true
  },
  {
    path:"/detail/:id",
    component:<Detail/>,
    isLogin:true
  },
  {
    path:"/login",
    component:<Login/>,
    isLogin:false
  },
  {
    path:"/oauth",
    component:<Oauth/>,
    isLogin:false
  }
];

export default routes;