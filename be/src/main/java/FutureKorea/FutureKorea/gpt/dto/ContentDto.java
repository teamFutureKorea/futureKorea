package FutureKorea.FutureKorea.gpt.dto;

import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentDto {
    private String content;
    private Long reportId;
}
