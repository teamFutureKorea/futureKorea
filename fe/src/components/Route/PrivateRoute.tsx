import React, { useEffect } from 'react';
import Header from '../header/Header';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../redux/type';

interface PrivateRouteProps {
  component: JSX.Element;
  isLogin: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, isLogin }) => {
  const user = useSelector((state: { User: { user: UserType } }) => state.User.user);
  const navigate = useNavigate();

  // TODO: Login 여부를 검사해 로그인 페이지로 이동
  useEffect(() => {
    if (isLogin && !user) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user, isLogin]);

  return (
    <Wrap>
      {isLogin ? <Header /> : null}
      {component}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

export default PrivateRoute;
