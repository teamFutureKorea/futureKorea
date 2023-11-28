import React, { useCallback, useState } from "react";
import { styled } from "styled-components";

const Detail = () => {
  const [searchKeyword,setSearchKeyword] = useState("");

  //TODO : 검색
  const handleComment = useCallback((e:any)=>{
    console.log(searchKeyword);
    setSearchKeyword("");
    e.target.value="";
  },[searchKeyword])
  return (
    <Container>
      <TitleBox>
        <Title>[성문주] 누리호 성공, 기업가 정신 확산 계기 되기를</Title>
        <TitleTagBox>
          <TitleTag>#성공</TitleTag>
          <TitleTag>#누리호</TitleTag>
          <TitleTag>#기업가</TitleTag>
        </TitleTagBox>
        <TitleDate>2022-11-30</TitleDate>
      </TitleBox>
      <ContentBox>
        누리호의 성공은 우리나라가 독자기술을 활용하여 세계에서 7번째로
        실용위성을 발사한 성과를 나타냅니다. 이 성공은 기업가정신의 중요성을
        강조하며, 위험을 감수하고 계속해서 도전함으로써 새로운 영역에서 가치를
        창출하는 데 성공한 결과입니다. 현재 우리 사회에서는 기업가정신이 충분히
        발현되지 못하고 있으며, 기업가정신을 향상시키기 위해 교육 및 문화적인
        변화가 필요합니다. 불확실성 회피 경향이 강한 문화에서는 새로운 도전과
        혁신이 어려울 수 있으며, 이를 극복하기 위한 종합적인 정책방안이
        필요합니다. 미래에는 기업가정신이 더욱 활발히 발현되어 사회적 가치를
        창출하는 데 기여하길 기대합니다.
      </ContentBox>
      <LinkButton>원본링크</LinkButton>
      <HeadTitle>관련 발의 법안</HeadTitle>
      <TitleBox>
        <Title>우주개발 진흥법 일부개정법률안</Title>
        <TitleTagBox>김민석 외 15인</TitleTagBox>
        <TitleDate>2022-11-30</TitleDate>
      </TitleBox>
      <LinkButton>원본링크</LinkButton>
      <HeadTitle>소통</HeadTitle>
      <ContentBox>
        <CommentInputBox>
          <CommentBtn onClick={handleComment}>
            <img height="100%" src="/search.png" alt="검색" />
            <div className="hidden-txt">검색</div>
          </CommentBtn>
          <CommentInput
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                handleComment(e);
              }
            }}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="검색어를 입력해주세요"
          />
        </CommentInputBox>
        
      </ContentBox>
    </Container>
  );
};

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
  height: 70px;
  flex-shrink: 0;
  background-color: #fff;
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
`;

const Title = styled.div`
  width: 100%;
  height: 50%;
  font-size: 15px;
  font-weight: 900;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const TitleTagBox = styled.div`
  flex-grow: 1;
  height: 50%;
  display: flex;
  gap: 10px;
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
  width: 60px;
  height: 50%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 76px 20px 20px 20px;
  background-color: #f5f5f5;
`;

export default Detail;
