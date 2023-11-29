package FutureKorea.FutureKorea.gpt.domain;

import FutureKorea.FutureKorea.Report.Report;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String keyword;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private Report report;

    public void setKeyword(String keyword, Report report){
        this.keyword = keyword;
        this.report = report;
    }
}

