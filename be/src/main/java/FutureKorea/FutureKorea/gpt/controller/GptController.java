package FutureKorea.FutureKorea.gpt.controller;

import FutureKorea.FutureKorea.gpt.dto.*;
import FutureKorea.FutureKorea.gpt.service.GptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/gpt")
public class GptController {

    private final GptService gptService;

    @PostMapping("/keyword")
    public ResponseEntity<Map<String, Object>> createKeyword(@RequestBody ContentDto contentDto) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            gptService.createKeyword(contentDto);
            resultMap.put("message", "키워드를 성공적으로 저장했습니다.");
            resultMap.put("code", HttpStatus.OK.value());
            resultMap.put("status", "success");
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resultMap.put("message", e.getMessage());
            resultMap.put("status", HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/question")
    public ChatGptResponseDto sendQuestion(@RequestBody QuestionRequestDto requestDto) {
        return gptService.askQuestion(requestDto);
    }

    @PostMapping("/summary")
    public ResponseEntity<Map<String, Object>> createSummary(@RequestBody ContentDto contentDto) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            gptService.createSummary(contentDto);
            resultMap.put("message", "요약을 성공적으로 저장했습니다.");
            resultMap.put("code", HttpStatus.OK.value());
            resultMap.put("status", "success");
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resultMap.put("message", e.getMessage());
            resultMap.put("status", HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/list/keyword/{columnId}")
    public ResponseEntity<Map<String, Object>> getKeyword(@PathVariable("columnId") Long columnId) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            List<String> keywordDto = gptService.getKeyword(columnId);
            resultMap.put("data", keywordDto);
            resultMap.put("message", "키워드를 성공적으로 조회했습니다.");
            resultMap.put("code", HttpStatus.OK.value());
            resultMap.put("status", "success");
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resultMap.put("message", e.getMessage());
            resultMap.put("status", HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/list/summary/{columnId}")
    public ResponseEntity<Map<String, Object>> getSummary(@PathVariable("columnId") Long columnId) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            SummaryDto summaryDto = gptService.getSummary(columnId);
            resultMap.put("data", summaryDto);
            resultMap.put("message", "요약을 성공적으로 조회했습니다.");
            resultMap.put("code", HttpStatus.OK.value());
            resultMap.put("status", "success");
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resultMap.put("message", e.getMessage());
            resultMap.put("status", HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/keyword/top")
    public ResponseEntity<Map<String, Object>> getTopKeyword(){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            List<String> topKeywordDto = gptService.getTopKeyword();
            resultMap.put("data", topKeywordDto);
            resultMap.put("message", "요약을 성공적으로 조회했습니다.");
            resultMap.put("code", HttpStatus.OK.value());
            resultMap.put("status", "success");
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resultMap.put("message", e.getMessage());
            resultMap.put("status", HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }


}