import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { Report } from "../list/List";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserType } from "../../redux/type";

interface Comment{
  nickname : string,
  imageUrl : string,
  reportId : number,
  content : string
}

const Detail = () => {
  const [searchKeyword,setSearchKeyword] = useState("");
  const [content,setContent] = useState<String>("요약문이 없습니다.");
  const report : Report = useLocation().state?.report;
  const user = useSelector((state: { User: { user: UserType } }) => state.User.user);
  const [commentList,setCommentList] = useState<Comment[]>([]);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND}/gpt/list/summary/${report.report_id}`)
      .then(({data})=>setContent(data.data.summary))
      .catch(err=>console.log(err));
  },[report]);
  
  //TODO : 댓글달기
  const handleComment = useCallback(()=>{
    axios.post(`${process.env.REACT_APP_BACKEND}/comment`,{
      nickname : user.nickname,
      imageUrl : user.imageUrl,
      reportId : report.report_id,
      content : searchKeyword
    }).then(res=>{
      axios.get(`${process.env.REACT_APP_BACKEND}/comment/${report.report_id}`)
        .then(({data})=>setCommentList(data.data))
        .catch(err=>console.log(err))
    })
    setSearchKeyword("");
  },[searchKeyword,report,user])

  const handleLink = useCallback((url:string)=>{
    window.open(url);
  },[])

  const comments = useMemo(()=>{
    if(!commentList||commentList.length===0) return [];
    return commentList.map((e : Comment,idx:number)=>
      <CommentWrap key={idx}>
        <CommentProfile>
          <CommentProfileimg src={e.imageUrl} alt="프로필 사진"/>
          <CommentProfilename>{e.nickname}</CommentProfilename>
        </CommentProfile>
        <CommentContent>{e.content}</CommentContent>
      </CommentWrap>
    )
  },[commentList]);

  return (
    <Container>
      <TitleBox>
        <Title>{report.title}</Title>
        <TitleTagBox>
          {
            report.keywords.map((e,idx)=><TitleTag key={idx}>#{e}</TitleTag>)
          }
        </TitleTagBox>
        <TitleDate>{report.regDttm}</TitleDate>
      </TitleBox>
      <ContentBox>
        {
          content
        }
      </ContentBox>
      <LinkButton onClick={()=>handleLink(report.detailUrl)}>원본링크</LinkButton>
      {/* <HeadTitle>관련 발의 법안</HeadTitle>
      <TitleBox>
        <Title>우주개발 진흥법 일부개정법률안</Title>
        <TitleTagBox>김민석 외 15인</TitleTagBox>
        <TitleDate>2022-11-30</TitleDate>
      </TitleBox>
      <LinkButton>원본링크</LinkButton> */}
      <HeadTitle>소통</HeadTitle>
      <ContentBox>
        <CommentInputBox>
          <CommentBtn onClick={handleComment}>
            <img height="100%" src="/search.png" alt="검색" />
            <div className="hidden-txt">검색</div>
          </CommentBtn>
          <CommentInput
            value={searchKeyword}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                handleComment();
              }
            }}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="댓글을를 입력해주세요"
          />
        </CommentInputBox>
        {comments}
      </ContentBox>
    </Container>
  );
};
const CommentWrap = styled.div`
  display: flex;
  gap: 1rem;
  box-sizing: border-box;
  padding: 10px;
  border-bottom: 1px solid #000;
`
const CommentProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CommentProfileimg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 56px;
`
const CommentProfilename = styled.p`
  font-weight: 900;
`
const CommentContent = styled.div`
`

const CommentInput = styled.input`
  width: 100%;
  font-size: 15px;
`
const CommentInputBox = styled.div`
  display: flex;
  border-radius: 56px;
  margin-top: 5px;
  height: 46px;
  width: 100%;

  border: 1px solid #C2C2C2;
  box-sizing: border-box;
  padding-right: 10px;
`
const CommentBtn = styled.button`
  height: 100%;
  width: 56px;
`

const HeadTitle = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 900;
  margin-top: 50px;
  margin-bottom: 10px;
`;
const LinkButton = styled.button`
  background-color: #44c7ff;
  color: #fff;
  font-weight: 900;
  box-sizing: border-box;
  padding: 10px 20px 10px 40px;
  border-radius: 18px;
  background-image: url("/Link.svg");
  background-repeat: no-repeat;
  background-position: 20px;
  float: right;
  margin-top: 10px;
`;

const ContentBox = styled.div`
  margin-top: 20px;
  width: 100%;
  background-color: #fff;
  -webkit-box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  -moz-box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
  line-height: 30px;
`;
const TitleBox = styled.div`
  width: 100%;
  background-color: #FFF;
  -webkit-box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  -moz-box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  box-shadow: 3px 0px 24px -8px rgba(66, 68, 90, 1);
  box-sizing: border-box;
  padding: 10px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 900;
  box-sizing: border-box;
  padding: 10px;
`;
const TitleTagBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
`;
const TitleTag = styled.div`
  box-sizing: border-box;
  padding: 0 10px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleDate = styled.div`
  text-align: right;
  font-size: 12px;
  padding-right: 10px;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 76px 20px 20px 20px;
  background-color: #f5f5f5;
`;

export default Detail;
