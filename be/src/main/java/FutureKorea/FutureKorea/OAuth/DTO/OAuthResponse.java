package FutureKorea.FutureKorea.OAuth.DTO;

import lombok.Data;
import lombok.Getter;

@Getter
public class OAuthResponse {
    private String nickname;
    private String imageUrl;

    public OAuthResponse(String nickname, String imageUrl) {
        this.nickname = nickname;
        this.imageUrl = imageUrl;
    }
}
