import Oauth from "./page/Oauth";
import TEST from "./page/TEST";
import Detail from "./page/detail/Detail";
import Home from "./page/home/Home";
import List from "./page/list/List";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path:"/list",
    component: List
  },
  {
    path:"/detail/:id",
    component:Detail
  },
  {
    path:"/test",
    component:TEST
  },
  {
    path:"/oauth",
    component:Oauth
  }
];

export default routes;