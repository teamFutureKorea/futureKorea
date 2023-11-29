import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'

interface Report{
  "title": String,
  "writer": String,
  "regDttm": String,
  "detailUrl": String,
  "type": String
}

const List = () => {
  const [data,setData] = useState<Report[]>([]);
  const [title,setTitle] = useState<String>("resreport");
  const search = useSelector((state:{Search:{searchKeyword:String}})=>state.Search.searchKeyword);
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND}/report/${title}?title=${search}`)
      .then(({data})=>setData(data.data))
      .catch(err=>console.log(err))
  },[title,search])
  return (
    <Container>
      <TitleBox onChange={(e)=>setTitle(e.target.value)}>
        <option value={"resreport"}>미래 연구보고서</option>
        <option value={"brief"}>미래 심층분석</option>
        <option value={"column"}>미래 칼럼</option>
        <option value={"thinking"}>미래 생각</option>
      </TitleBox>
      <ListItemBox>
        {
          data.map((e,idx)=><ListItem key={idx}>
            <ListItemTitle>{e.title}</ListItemTitle>
            <ListItemTagBox>
              <ListItemTag>#성공</ListItemTag>
              <ListItemTag>#누리호</ListItemTag>
              <ListItemTag>#기업가</ListItemTag>
            </ListItemTagBox>
            <ListItemDate>{e.regDttm}</ListItemDate>
          </ListItem>)
        }
      </ListItemBox>
    </Container>
  )
}

const ListItemBox = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-wrap: nowrap;
  gap: 20px;
`
const ListItem = styled.div`
  width: 100%;
  height: 70px;
  flex-shrink: 0;
  background-color: #FFF;
  -webkit-box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  -moz-box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  white-space: nowrap;
  gap: 5px;
`
const ListItemTitle = styled.div`
  width: 100%;
  height: 50%;
  font-size: 15px;
  font-weight: 900;
  overflow: hidden;
  text-overflow: ellipsis;

`
const ListItemTagBox = styled.div`
  flex-grow : 1;
  height: 50%;
  display: flex;
  gap: 10px;
`
const ListItemTag = styled.div`
  box-sizing: border-box;
  padding: 0 10px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ListItemDate = styled.div`
  width: 60px;
  height: 50%;
`

const TitleBox = styled.select`
  width: 200px;
  height: 30px;
  -webkit-box-shadow: 8px 8px 24px -4px rgba(66, 68, 90, 1);
  -moz-box-shadow: 8px 8px 24px -4px rgba(66, 68, 90, 1);
  box-shadow: 8px 8px 24px -4px rgba(66, 68, 90, 1);
  font-size: 20px;
  font-weight: 900;
  & option{
    width: 200px;
    height: 30px;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 76px 20px 20px 20px;
  background-color: #F5F5F5;
`

export default List