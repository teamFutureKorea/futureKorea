package FutureKorea.FutureKorea.Report;

import FutureKorea.FutureKorea.gpt.domain.Keyword;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Report {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @OneToMany(mappedBy = "report")
        private List<Keyword> keywords = new ArrayList<>();

        private Integer type;

        private String title;
        private String Writer;
        private String RegDttm;
        private String DetailUrl;
}
