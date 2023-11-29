package FutureKorea.FutureKorea.gpt.dto;

import FutureKorea.FutureKorea.Report.Report;
import FutureKorea.FutureKorea.gpt.domain.Summary;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SummaryDto {
    private String summary;
//    private Long reportId;
//    private Integer type;
//    private String title;
//    private String Writer;
//    private String RegDttm;
//    private String DetailUrl;

    public SummaryDto(Summary summary) {
        this.summary = summary.getSummary();
//        this.reportId = summary.getReport().getId();
//        this.type = report.getType();
//        this.title = report.getTitle();
//        this.Writer = report.getWriter();
//        this.RegDttm = report.getRegDttm();
//        this.DetailUrl = report.getDetailUrl();
    }
}
