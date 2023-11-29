package FutureKorea.FutureKorea.comment;

import FutureKorea.FutureKorea.Report.Report;
import jakarta.persistence.*;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;
    private String imageUrl;
    private String content;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private Report report;

}
