package FutureKorea.FutureKorea.gpt.dto;

import FutureKorea.FutureKorea.Report.Report;
import FutureKorea.FutureKorea.gpt.domain.Keyword;
import FutureKorea.FutureKorea.gpt.domain.Summary;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KeywordDto {
    private String keyword;


    public KeywordDto(Keyword keyword) {
        this.keyword = keyword.getKeyword();

    }
}
