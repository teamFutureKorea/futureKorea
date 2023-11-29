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
public class Summary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10000)
    private String summary;

    @OneToOne
    @JoinColumn(name = "report_id")
    private Report report;

    public void setSummary(String inputText, Report report) {
        this.summary = inputText;
        this.report = report;
    }
}
