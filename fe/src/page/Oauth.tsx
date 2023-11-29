import axios from 'axios';
import { useEffect } from 'react'

const Oauth = () => {
  useEffect(()=>{
    const code = new URL(window.location.href).searchParams.get("code");
    axios({
      method : "post",
      url : `${process.env.REACT_APP_BACKEND}/auth/kakao`,
      data : {code,redirectUri:process.env.REACT_APP_REDIRECT_URL} 
    }).then(({data})=>console.log(data))
    .catch(err=>console.log(err));
  },[]);
  return null;
}

export default Oauth