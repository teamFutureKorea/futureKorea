package FutureKorea.FutureKorea.Report;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private ReportService listService;

    @GetMapping("/allreport")
    public ResponseEntity<Map<String, Object>> getAllReport(@RequestParam(value="title") String title){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        try {
            resultMap.put("data", listService.getReport(title));
            resultMap.put("message", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            resultMap.put("message", FAIL);
            resultMap.put("text", e.toString());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/resreport")
    public ResponseEntity<Map<String, Object>> getResReport(@RequestParam(value="title") String title){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        try {
            resultMap.put("data", listService.getTypeReport(title, 1));
            resultMap.put("message", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            resultMap.put("message", FAIL);
            resultMap.put("text", e.toString());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/brief")
    public ResponseEntity<Map<String, Object>> getBrief(@RequestParam(value="title") String title){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        try {
            resultMap.put("data", listService.getTypeReport(title, 1));
            resultMap.put("message", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            resultMap.put("message", FAIL);
            resultMap.put("text", e.toString());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/column")
    public ResponseEntity<Map<String, Object>> getColumn(@RequestParam(value="title") String title){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        try {
            resultMap.put("data", listService.getTypeReport(title, 2));
            resultMap.put("message", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            resultMap.put("message", FAIL);
            resultMap.put("text", e.toString());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/thinking")
    public ResponseEntity<Map<String, Object>> getThinking(@RequestParam(value="title") String title){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        try {
            resultMap.put("data", listService.getTypeReport(title, 3));
            resultMap.put("message", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            resultMap.put("message", FAIL);
            resultMap.put("text", e.toString());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/init")
    public ResponseEntity<Map<String, Object>> initDataBase(){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        try {
            listService.initReportData();
            resultMap.put("message", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            resultMap.put("message", FAIL);
            resultMap.put("text", e.toString());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }
}
