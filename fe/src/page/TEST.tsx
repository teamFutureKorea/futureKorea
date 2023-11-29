import React from 'react'
import { styled } from 'styled-components'

const TEST = () => {
  return (
    <Login href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`}>로그인</Login>
  )
}

const Login = styled.a`
  display: block;
  width: 200px;
  height: 50px;
  margin: 0 auto;
  margin-top: 20vh;
  background-color: blue;
  color: #FFF;
`

export default TEST