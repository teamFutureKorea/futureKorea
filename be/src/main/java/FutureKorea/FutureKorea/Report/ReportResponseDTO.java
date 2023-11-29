package FutureKorea.FutureKorea.Report;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ReportResponseDTO {
    private Long report_id;
    private String title;
    private String writer;
    private String regDttm;
    private String detailUrl;
    private String type;

    private List<String> keywords;

    public ReportResponseDTO(Report report){
        this.report_id = report.getId();
        this.title = report.getTitle();
        this.writer = report.getWriter();
        this.regDttm = report.getRegDttm();
        this.detailUrl = report.getDetailUrl();

        String[] Types = new String[] {"RESREPORT", "BRIEF", "COLUMN", "THINKING"};
        this.type = Types[report.getType()];

        this.keywords = new ArrayList<>();
        for(int i = 0; i < report.getKeywords().size(); i++){
            this.keywords.add(report.getKeywords().get(i).getKeyword());
        }
    }
}
