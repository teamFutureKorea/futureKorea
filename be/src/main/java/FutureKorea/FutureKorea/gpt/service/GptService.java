package FutureKorea.FutureKorea.gpt.service;

import FutureKorea.FutureKorea.gpt.config.ChatGptConfig;
import FutureKorea.FutureKorea.gpt.dto.ChatGptRequestDto;
import FutureKorea.FutureKorea.gpt.dto.ChatGptResponseDto;
import FutureKorea.FutureKorea.gpt.dto.QuestionRequestDto;
import FutureKorea.FutureKorea.gpt.dto.ContentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class GptService {

    private static RestTemplate restTemplate = new RestTemplate();
    public void createKeyword(ContentDto contentDto) {
        QuestionRequestDto requestDto = new QuestionRequestDto();
        requestDto.setQuestion(contentDto.getContent() + "\n\n 위 내용에서 키워드를 [] 리스트 안에다가 설명없이 단어로만 관련도 높은 순서대로 5개 넣어서 따옴표 없이 글자만 넣어서 리스트로 반환해줘. ");
        ChatGptResponseDto chatGptResponseDto = askQuestion(requestDto);
        String inputText = chatGptResponseDto.getChoices().get(0).getText();

        // 정규표현식 패턴 설정
        Pattern pattern = Pattern.compile("\\[(.*?)\\]");

        // 입력 텍스트에서 매칭되는 부분 찾기
        Matcher matcher = pattern.matcher(inputText);
        List<String> valuesList = new ArrayList<>();
        if (matcher.find()) {
            // 대괄호 안의 값들을 리스트로 추출
            String valuesString = matcher.group(1);
            for (String value : valuesString.split(", ")) {
                valuesList.add(value.replace("\"", ""));
            }
        }
    }

    public HttpEntity<ChatGptRequestDto> buildHttpEntity(ChatGptRequestDto requestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(ChatGptConfig.MEDIA_TYPE));
        headers.add(ChatGptConfig.AUTHORIZATION, ChatGptConfig.BEARER + ChatGptConfig.API_KEY);
        return new HttpEntity<>(requestDto, headers);
    }

    public ChatGptResponseDto getResponse(HttpEntity<ChatGptRequestDto> chatGptRequestDtoHttpEntity) {
        ResponseEntity<ChatGptResponseDto> responseEntity = restTemplate.postForEntity(
                ChatGptConfig.URL,
                chatGptRequestDtoHttpEntity,
                ChatGptResponseDto.class);

        return responseEntity.getBody();
    }

    public ChatGptResponseDto askQuestion(QuestionRequestDto requestDto) {
        return this.getResponse(
                this.buildHttpEntity(
                        new ChatGptRequestDto(
                                ChatGptConfig.MODEL,
                                requestDto.getQuestion(),
                                ChatGptConfig.MAX_TOKEN,
                                ChatGptConfig.TEMPERATURE,
                                ChatGptConfig.TOP_P
                        )
                )
        );
    }
}
