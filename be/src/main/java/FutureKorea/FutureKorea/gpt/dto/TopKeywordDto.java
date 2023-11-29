package FutureKorea.FutureKorea.gpt.dto;

import FutureKorea.FutureKorea.gpt.domain.Keyword;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TopKeywordDto {
    private String keyword;


    public TopKeywordDto(Keyword keyword) {
        this.keyword = keyword.getKeyword();

    }
}
