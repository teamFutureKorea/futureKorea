package FutureKorea.FutureKorea.Report;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

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

        private Integer type;

        private String title;
        private String Writer;
        private String RegDttm;
        private String DetailUrl;
}
