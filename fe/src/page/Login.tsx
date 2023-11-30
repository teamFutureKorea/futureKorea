import React from 'react'
import { styled } from 'styled-components'

const Login = () => {
  return (
    <Wrap>
      <BgImg src='/Logo2.png' alt='미래한국' />
      <p>미래한국</p>
      <KakaoLoginBtn href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`}>
        <img src='/kakao_login_medium_wide.png' alt='카카오 로그인' />
        <div className='hidden-txt'>로그인</div>
      </KakaoLoginBtn>
    </Wrap>
  )
}

const BgImg = styled.img`
  width: 80vw;
  height: 80vw;
`

const KakaoLoginBtn = styled.a`
  margin-top: 20px;
`

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 56px;
  background-color: #D1DEE4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 900;
`

export default Login