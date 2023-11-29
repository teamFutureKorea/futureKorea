import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/UserAction';
import { useNavigate } from 'react-router-dom';
const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    const code = new URL(window.location.href).searchParams.get("code");
    axios({
      method : "post",
      url : `${process.env.REACT_APP_BACKEND}/auth/kakao`,
      data : {code,redirectUri:process.env.REACT_APP_REDIRECT_URL} 
    }).then(({data})=>{
      dispatch(setUser(data));
      navigate("/",{replace:true});
    })
    .catch(err=>console.log(err));
  },[dispatch,navigate]);
  return null;
}

export default Oauth