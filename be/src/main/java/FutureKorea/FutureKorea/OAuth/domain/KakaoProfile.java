package FutureKorea.FutureKorea.OAuth.domain;

import lombok.Data;
import lombok.Getter;

@Data
public class KakaoProfile {
    private String connected_at;
    private Long id;
    private Kakao_account kakao_account;
    private Properties properties;

    @Data
    class Kakao_account {
        public Profile profile;
        private Boolean profile_nickname_needs_agreement;
        private Boolean profile_image_needs_agreement;

        @Data
        public class Profile {
            public String nickname;
            public String thumbnail_image_url;
            public String profile_image_url;
            public Boolean is_default_image;
        }
    }

    @Data
    class Properties {
        private String nickname;
        private String profile_image;
        private String thumbnail_image;
    }

    public String getNickname() {
        String nickname = kakao_account.profile.getNickname();
        return nickname;
    }

    public String getImageUrl() {
        String imageUrl = kakao_account.profile.getProfile_image_url();
        return imageUrl;
    }
}
