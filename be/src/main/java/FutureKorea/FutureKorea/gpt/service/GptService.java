package FutureKorea.FutureKorea.gpt.service;

import FutureKorea.FutureKorea.Report.Report;
import FutureKorea.FutureKorea.Report.ReportRepository;
import FutureKorea.FutureKorea.gpt.config.ChatGptConfig;
import FutureKorea.FutureKorea.gpt.domain.Keyword;
import FutureKorea.FutureKorea.gpt.domain.Summary;
import FutureKorea.FutureKorea.gpt.dto.*;
import FutureKorea.FutureKorea.gpt.repository.KeywordRepository;
import FutureKorea.FutureKorea.gpt.repository.SummaryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.security.Key;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class GptService {

    private static RestTemplate restTemplate = new RestTemplate();
    private final KeywordRepository keywordRepository;
    private final SummaryRepository summaryRepository;
    private final ReportRepository reportRepository;
    @Transactional
    public void createKeyword(ContentDto contentDto) {
        Report report = reportRepository.findById(contentDto.getReportId()).orElse(null);

        QuestionRequestDto requestDto = new QuestionRequestDto();
        requestDto.setQuestion(contentDto.getContent() + "\n\n 위 내용에서 키워드를 [] 리스트 안에다가 설명없이 단어로만 관련도 높은 순서대로 5개 넣어서 따옴표 없이 글자만 넣어서 리스트로 반환해줘. ");
        ChatGptResponseDto chatGptResponseDto = askQuestion(requestDto);
        String inputText = chatGptResponseDto.getChoices().get(0).getText();

        System.out.println(inputText);
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
                Keyword keyword = new Keyword();
                keyword.setKeyword(value.replace("\"", ""), report);
                keywordRepository.save(keyword);
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

    @Transactional
    public List<String> getKeyword(Long columnId) {
//        Report report = reportRepository.findById(columnId).orElse(null);
        List<String> keywordDtos = new ArrayList<>();
        List<Keyword> keywords = keywordRepository.findByReportId(columnId);
        for(Keyword keyword : keywords){
            keywordDtos.add(keyword.getKeyword());
        }
        return keywordDtos;
    }

    @Transactional
    public void createSummary(ContentDto contentDto) {
        Report report = reportRepository.findById(contentDto.getReportId()).orElse(null);

        QuestionRequestDto requestDto = new QuestionRequestDto();
        requestDto.setQuestion(contentDto.getContent() + "\n\n 위 내용을 다섯문장으로 요약해서 한 문단으로 줘.");
        ChatGptResponseDto chatGptResponseDto = askQuestion(requestDto);
        String inputText = chatGptResponseDto.getChoices().get(0).getText();

        System.out.println(inputText);
        Summary summary = new Summary();
        summary.setSummary(inputText, report);
        summaryRepository.save(summary);

    }

    @Transactional
    public SummaryDto getSummary(Long columnId) {
        Summary summary = summaryRepository.findByReportId(columnId);
//        Report report = reportRepository.findById(columnId).orElse(null);

        return new SummaryDto(summary);
    }

    public List<String> getTopKeyword() {
        List<Object[]> topKeywords = keywordRepository.findTop20ByOrderByCntDesc();
        List<String> topKeywordDtos = new ArrayList<>();

        for (Object[] row : topKeywords) {
            // 첫 번째 열이 keyword, 두 번째 열이 count
            String keyword = (String) row[0];
            topKeywordDtos.add(keyword);
        }

        return topKeywordDtos;
    }

}
