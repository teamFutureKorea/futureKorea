package FutureKorea.FutureKorea.Report;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/list")
public class ReportController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private ReportService listService;

    @GetMapping("/resreport")
    public ResponseEntity<Map<String, Object>> getLunch(){
        Map<String, Object> resultMap = new HashMap<String, Object>();
        try {
            listService.getReport("출산");
            resultMap.put("data", SUCCESS);
            resultMap.put("message", SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            resultMap.put("message", FAIL);
            resultMap.put("text", e.toString());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

}
