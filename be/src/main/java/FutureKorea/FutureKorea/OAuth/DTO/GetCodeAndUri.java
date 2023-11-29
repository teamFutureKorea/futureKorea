package FutureKorea.FutureKorea.OAuth.DTO;

import lombok.Getter;

@Getter
public class GetCodeAndUri {
    private String code;
    private String redirectUri;
}
