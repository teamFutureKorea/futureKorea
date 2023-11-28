import React from 'react'
import { styled } from 'styled-components'

const List = () => {
  return (
    <Container>
      <TitleBox>
        <option>미래 연구 보고서</option>
        <option>미래심층분석</option>
        <option>미래칼럼</option>
        <option>미래생각</option>
      </TitleBox>
      <ListItemBox>
        <ListItem>
          <ListItemTitle>[성문주] 누리호 성공, 기업가 정신 확산 계기 되기를</ListItemTitle>
          <ListItemTagBox>
            <ListItemTag>#성공</ListItemTag>
            <ListItemTag>#누리호</ListItemTag>
            <ListItemTag>#기업가</ListItemTag>
          </ListItemTagBox>
          <ListItemDate>2022-11-30</ListItemDate>
        </ListItem>
        <ListItem>
          <ListItemTitle>[박성준] 스테이블코인의 관리·감독 방안 고민할 때</ListItemTitle>
          <ListItemTagBox>
            <ListItemTag>#스테이블 코인</ListItemTag>
            <ListItemTag>#관리</ListItemTag>
            <ListItemTag>#감독</ListItemTag>
          </ListItemTagBox>
          <ListItemDate>2022-11-30</ListItemDate>
        </ListItem>
        <ListItem>
          <ListItemTitle>[성문주] 누리호 성공, 기업가 정신 확산 계기 되기를누리호 성공, 기업가 정신 확산 계기 되기를</ListItemTitle>
          <ListItemTagBox>
            <ListItemTag>#성공</ListItemTag>
            <ListItemTag>#누리호</ListItemTag>
            <ListItemTag>#기업가</ListItemTag>
          </ListItemTagBox>
          <ListItemDate>2022-11-30</ListItemDate>
        </ListItem>
        <ListItem>
          <ListItemTitle>[성문주] 누리호 성공, 기업가 정신 확산 계기 되기를</ListItemTitle>
          <ListItemTagBox>
            <ListItemTag>#성공</ListItemTag>
            <ListItemTag>#누리호</ListItemTag>
            <ListItemTag>#기업가</ListItemTag>
          </ListItemTagBox>
          <ListItemDate>2022-11-30</ListItemDate>
        </ListItem>
        <ListItem>
          <ListItemTitle>[성문주] 누리호 성공, 기업가 정신 확산 계기 되기를</ListItemTitle>
          <ListItemTagBox>
            <ListItemTag>#성공</ListItemTag>
            <ListItemTag>#누리호</ListItemTag>
            <ListItemTag>#기업가</ListItemTag>
          </ListItemTagBox>
          <ListItemDate>2022-11-30</ListItemDate>
        </ListItem>
        <ListItem>
          <ListItemTitle>[성문주] 누리호 성공, 기업가 정신 확산 계기 되기를</ListItemTitle>
          <ListItemTagBox>
            <ListItemTag>#성공</ListItemTag>
            <ListItemTag>#누리호</ListItemTag>
            <ListItemTag>#기업가</ListItemTag>
          </ListItemTagBox>
          <ListItemDate>2022-11-30</ListItemDate>
        </ListItem>
        <ListItem>
          <ListItemTitle>[성문주] 누리호 성공, 기업가 정신 확산 계기 되기를</ListItemTitle>
          <ListItemTagBox>
            <ListItemTag>#성공</ListItemTag>
            <ListItemTag>#누리호</ListItemTag>
            <ListItemTag>#기업가</ListItemTag>
          </ListItemTagBox>
          <ListItemDate>2022-11-30</ListItemDate>
        </ListItem>
        <ListItem>
          <ListItemTitle>[성문주] 누리호 성공, 기업가 정신 확산 계기 되기를</ListItemTitle>
          <ListItemTagBox>
            <ListItemTag>#성공</ListItemTag>
            <ListItemTag>#누리호</ListItemTag>
            <ListItemTag>#기업가</ListItemTag>
          </ListItemTagBox>
          <ListItemDate>2022-11-30</ListItemDate>
        </ListItem>
        <ListItem>
          <ListItemTitle>[성문주] 누리호 성공, 기업가 정신 확산 계기 되기를</ListItemTitle>
          <ListItemTagBox>
            <ListItemTag>#성공</ListItemTag>
            <ListItemTag>#누리호</ListItemTag>
            <ListItemTag>#기업가</ListItemTag>
          </ListItemTagBox>
          <ListItemDate>2022-11-30</ListItemDate>
        </ListItem>
        <ListItem>
          <ListItemTitle>[성문주] 누리호 성공, 기업가 정신 확산 계기 되기를</ListItemTitle>
          <ListItemTagBox>
            <ListItemTag>#성공</ListItemTag>
            <ListItemTag>#누리호</ListItemTag>
            <ListItemTag>#기업가</ListItemTag>
          </ListItemTagBox>
          <ListItemDate>2022-11-30</ListItemDate>
        </ListItem>
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