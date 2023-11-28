package FutureKorea.FutureKorea.Report;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@Service
public class ReportService {

    @Value("${api.key}")
    private String secretKey;

    @Autowired
    private ReportRepository reportRepository;

    private String[] Types = new String[] {"RESREPORT", "BRIEF", "COLUMN", "THINKING"};
    public void getReport(String searchTitle) throws Exception {
        initReportData();
        // List<MealDTO> resultMapList = new ArrayList<>();
    }

    private void initReportData() throws Exception {

        for(int type = 0; type < 4; type++){
            // URL생성기
            StringBuilder urlBuilder =
                    new StringBuilder("https://open.assembly.go.kr/portal/openapi/");
            urlBuilder.append(URLEncoder.encode(Types[type], "UTF-8"));

            urlBuilder.append("?" + URLEncoder.encode("KEY", "UTF-8") + "="
                    + URLEncoder.encode(secretKey, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("Type", "UTF-8") + "="
                    + URLEncoder.encode("json", "UTF-8"));

            // 페이지 위치
            urlBuilder.append("&" + URLEncoder.encode("pIndex", "UTF-8") + "="
                    + URLEncoder.encode("1", "UTF-8"));

            // 페이지 당 요청 숫자
            urlBuilder.append("&" + URLEncoder.encode("pSize", "UTF-8") + "="
                    + URLEncoder.encode("10", "UTF-8"));


            // URL호출
            URL url = new URL(urlBuilder.toString());

            JSONObject jObject = callURL(url).getJSONArray(Types[type]).getJSONObject(0);

            JSONArray head = jObject.getJSONArray("head");

            int total_cnt = head.getJSONObject(0).getInt("list_total_count");

            callApiInRange((total_cnt + 9) / 10, type);

        }

        return;
    }
    private void callApiInRange(int total_page, int type) throws Exception {
        for(int i = 1; i < total_page; i++){
            // URL생성기
            StringBuilder urlBuilder =
                    new StringBuilder("https://open.assembly.go.kr/portal/openapi/");
            urlBuilder.append(URLEncoder.encode(Types[type], "UTF-8"));

            urlBuilder.append("?" + URLEncoder.encode("KEY", "UTF-8") + "="
                    + URLEncoder.encode(secretKey, "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("Type", "UTF-8") + "="
                    + URLEncoder.encode("json", "UTF-8"));

            // 페이지 위치
            urlBuilder.append("&" + URLEncoder.encode("pIndex", "UTF-8") + "="
                    + URLEncoder.encode("" + i, "UTF-8"));

            // 페이지 당 요청 숫자
            urlBuilder.append("&" + URLEncoder.encode("pSize", "UTF-8") + "="
                    + URLEncoder.encode("10", "UTF-8"));


            // URL호출
            URL url = new URL(urlBuilder.toString());

            JSONObject jObject = callURL(url);

            saveDatabase(jObject, type);
        }

    }

    private void saveDatabase(JSONObject jsonObject, int type){

        JSONArray row = jsonObject.getJSONArray(Types[type]).getJSONObject(1).getJSONArray("row");

        JSONObject now_report;

        for(int i = 0; i < row.length(); i++){
            now_report = row.getJSONObject(i);

            if (now_report.get("TITLE") == JSONObject.NULL) continue;

            String title = now_report.getString("TITLE");
            String writer = type < 2 ? now_report.getString("CHIEF_RESRCH") : now_report.getString("WRITER");
            String regDttm = now_report.getString("REG_DTTM");
            String detailUrl = now_report.getString("DETAIL_URL");


            Report report = Report.builder()
                    .title(title)
                    .type(type)
                    .Writer(writer)
                    .RegDttm(regDttm)
                    .DetailUrl(detailUrl)
                    .build();

            reportRepository.save(report);
        }
    }

    private JSONObject callURL(URL url) throws Exception{

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        BufferedReader rd;

        // 요청이 성공적으로 오지 않았을 때, 예외처리
        if (conn.getResponseCode() != 200) {
            throw new Exception();
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        }

        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;

        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        rd.close();
        conn.disconnect();

        return new JSONObject(sb.toString());
    }
}
