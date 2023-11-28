package FutureKorea.FutureKorea.controller;

import FutureKorea.FutureKorea.DTO.GetCodeAndUri;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequiredArgsConstructor
public class FutureKoreaController {

    @GetMapping("/auth/kakao/callback")
    public @ResponseBody String kakaoCallback(String code){

        RestTemplate rt = new RestTemplate();

        //HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "ff3fbec59eb79359987b60913bbff785");
        params.add("redirect_uri", "http://localhost:8080/auth/kakao/callback");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        return "카카오 인증 완료: 코드값:" + response;
    }

    // code와 requesturi받기
    @PostMapping("/auth/kakao")
    public String getCodeAndUri(
            @RequestBody GetCodeAndUri request) {

        String code = request.getCode();
        String requestUri = request.getRequestUri();

        return code + requestUri;
    }
}
