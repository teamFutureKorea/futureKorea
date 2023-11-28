package FutureKorea.FutureKorea.gpt.controller;

import FutureKorea.FutureKorea.gpt.dto.ChatGptResponseDto;
import FutureKorea.FutureKorea.gpt.dto.QuestionRequestDto;
import FutureKorea.FutureKorea.gpt.dto.ContentDto;
import FutureKorea.FutureKorea.gpt.service.GptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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

//    @GetMapping("/summary")
//    public ResponseEntity<Map<String, Object>> getExamMonthDayList(@ApiIgnore @RequestHeader String authorization,
//                                                                   @PathVariable Long directorNo,
//                                                                   @RequestParam int year, @RequestParam int month, @RequestParam(value = "day", defaultValue = "0") int day){
//        Map<String, Object> resultMap = new HashMap<>();
//        try{
//            String token  = authorization.replace("Bearer ", "");
//            String authority = jwtTokenProvider.getAuthority(token);
//
//            resultMap.put("message","시험을 성공적으로 조회했습니다.");
//            resultMap.put("data", directorService.getExamMonthDayList(directorNo, year, month, day, authority));
//            resultMap.put("code", HttpStatus.OK.value());
//            resultMap.put("status", "success");
//            return new ResponseEntity<>(resultMap, HttpStatus.OK);
//        }catch (IllegalArgumentException e){
//            resultMap.put("message", e.getMessage());
//            resultMap.put("status", HttpStatus.BAD_REQUEST.value());
//            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
//        }
//    }

//    @GetMapping("/list/keyword")
//    public ResponseEntity<Map<String, Object>> getExamMonthDayList(@ApiIgnore @RequestHeader String authorization,
//                                                                   @PathVariable Long directorNo,
//                                                                   @RequestParam int year, @RequestParam int month, @RequestParam(value = "day", defaultValue = "0") int day){
//        Map<String, Object> resultMap = new HashMap<>();
//        try{
//            String token  = authorization.replace("Bearer ", "");
//            String authority = jwtTokenProvider.getAuthority(token);
//
//            resultMap.put("message","시험을 성공적으로 조회했습니다.");
//            resultMap.put("data", directorService.getExamMonthDayList(directorNo, year, month, day, authority));
//            resultMap.put("code", HttpStatus.OK.value());
//            resultMap.put("status", "success");
//            return new ResponseEntity<>(resultMap, HttpStatus.OK);
//        }catch (IllegalArgumentException e){
//            resultMap.put("message", e.getMessage());
//            resultMap.put("status", HttpStatus.BAD_REQUEST.value());
//            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @GetMapping("/list/summary")
//    public ResponseEntity<Map<String, Object>> getExamMonthDayList(@ApiIgnore @RequestHeader String authorization,
//                                                                   @PathVariable Long directorNo,
//                                                                   @RequestParam int year, @RequestParam int month, @RequestParam(value = "day", defaultValue = "0") int day){
//        Map<String, Object> resultMap = new HashMap<>();
//        try{
//            String token  = authorization.replace("Bearer ", "");
//            String authority = jwtTokenProvider.getAuthority(token);
//
//            resultMap.put("message","시험을 성공적으로 조회했습니다.");
//            resultMap.put("data", directorService.getExamMonthDayList(directorNo, year, month, day, authority));
//            resultMap.put("code", HttpStatus.OK.value());
//            resultMap.put("status", "success");
//            return new ResponseEntity<>(resultMap, HttpStatus.OK);
//        }catch (IllegalArgumentException e){
//            resultMap.put("message", e.getMessage());
//            resultMap.put("status", HttpStatus.BAD_REQUEST.value());
//            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
//        }
//    }
}