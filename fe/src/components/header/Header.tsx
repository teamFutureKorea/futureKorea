import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { setSearch } from '../../redux/actions/SearchAction';

const Header = () => {
  const [isSearch,setIsSearch] = useState(false);
  const [searchKeyword,setSearchKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //TODO : 검색
  const handleSearch = useCallback((e:any)=>{
    dispatch(setSearch(searchKeyword));
    setSearchKeyword("");
    setIsSearch(e=>false)
    e.target.value="";
    navigate("/list");
  },[searchKeyword,dispatch,navigate])

  return (
    <Container $isOpen={isSearch}>
      {
        isSearch ? 
        <SearchBox>
          <SearchBtn onClick={handleSearch}>
            <img height="100%" src='/search.png' alt='검색'/>
            <div className='hidden-txt'>검색</div>
          </SearchBtn>
          <SearchInput onKeyDown={(e)=>{if(e.code==="Enter"){handleSearch(e)}}} onChange={(e)=>setSearchKeyword(e.target.value)} placeholder='검색어를 입력해주세요'/>
        </SearchBox>
        :
        <>
          <Link to="/">
            <img height="100%" src="/Logo.png" alt='미래한국' />
            미래한국
          </Link>
          <SearchBtn onClick={()=>setIsSearch(e=>true)}>
            <img height="100%" src="/search.png" alt='검색'/>
            <div className='hidden-txt'>검색</div>
          </SearchBtn>
        </>
      }
    </Container>
  )
}
const searchOpen = keyframes`
  0% {
    width: 56px;
  }
  100% {
    width: 100%;
  }
`

const SearchInput = styled.input`
  width: 100%;
  font-size: 15px;
`
const SearchBox = styled.div`
  display: flex;
  border-radius: 56px;
  margin-top: 5px;
  height: 46px;
  width: 100%;
  animation-timing-function: linear;
  -webkit-animation: ${searchOpen} 0.2s;
  animation: ${searchOpen} 0.2s;

  border: 1px solid #C2C2C2;
  box-sizing: border-box;
  padding-right: 10px;
`
const SearchBtn = styled.button`
  height: 100%;
  width: 56px;
`

const Container = styled.header<{$isOpen:Boolean}>`
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size: 20px;
  font-weight: 600;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  -webkit-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
  -moz-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
  box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
  display: flex;
  justify-content: ${(props) => (props.$isOpen ? 'flex-end' : 'space-between')};
  padding: 0 10px;
  z-index: 999;
  background-color: #FFF;
`;

export default Header