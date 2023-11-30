import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

export interface Report{
  "report_id":number
  "title": string,
  "writer": string,
  "regDttm": string,
  "detailUrl": string,
  "type": string,
  "keywords":string[]
}

const List = () => {
  const [data,setData] = useState<Report[]>([]);
  const [title,setTitle] = useState<string>("resreport");
  const search = useSelector((state:{Search:{searchKeyword:string}})=>state.Search.searchKeyword);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND}/report/${title}?title=${search}`)
      .then(({data})=>setData(data.data))
      .catch(err=>console.log(err))
  },[title,search])

  const handleListItem = useCallback((report:Report)=>{
    navigate(`/detail/${report.report_id}`,{state:{report}})
  },[navigate])
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
          data ? 
          data.map((e,idx)=><ListItem onClick={()=>handleListItem(e)} key={idx}>
            <ListItemTitle>{e.title}</ListItemTitle>
            <ListItemTagBox>
              {
                e.keywords.map((el,idx2)=><ListItemTag key={idx2}>#{el}</ListItemTag>)
              }
            </ListItemTagBox>
            <ListItemDate>{e.regDttm}</ListItemDate>
          </ListItem>) : null
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
  flex-shrink: 0;
  background-color: #FFF;
  -webkit-box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  -moz-box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  box-sizing: border-box;
  padding: 10px;
  gap: 5px;
`
const ListItemTitle = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 900;
  box-sizing: border-box;
  padding: 10px;

`
const ListItemTagBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
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
  font-size: 12px;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
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