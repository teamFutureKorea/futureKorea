package FutureKorea.FutureKorea.Report;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportResponseDTO {
    private String title;
    private String writer;
    private String regDttm;
    private String detailUrl;
    private String type;

    public ReportResponseDTO(Report report){
        this.title = report.getTitle();
        this.writer = report.getWriter();
        this.regDttm = report.getRegDttm();
        this.detailUrl = report.getDetailUrl();

        String[] Types = new String[] {"RESREPORT", "BRIEF", "COLUMN", "THINKING"};
        this.type = Types[report.getType()];
    }
}
