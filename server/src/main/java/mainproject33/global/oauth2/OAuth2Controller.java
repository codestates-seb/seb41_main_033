package mainproject33.global.oauth2;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.member.dto.MemberDto;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.mapper.MemberMapper;
import mainproject33.domain.member.repository.MemberRepository;
import mainproject33.domain.member.service.MemberService;
import mainproject33.global.dto.SingleResponseDto;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import mainproject33.global.security.dto.LoginDto;
import mainproject33.global.security.dto.ResponseDto;
import mainproject33.global.security.dto.TokenDto;
import mainproject33.global.security.mapper.LoginMapper;
import mainproject33.global.security.service.AuthService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class OAuth2Controller {

    @Value("${google.auth-url}")
    private String googleAuthUrl;
    @Value("${google.login-url}")
    private String googleLoginUrl;
    @Value("${google.client-id}")
    private String googleClientId;
    @Value("${google.secret}")
    private String googleClientSecret;
    @Value("${google.redirect-url}")
    private String googleRedirectUrl;

    private final MemberRepository memberRepository;
    private final AuthService authService;
    private final LoginMapper loginMapper;
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @GetMapping("/getoauth2")
    public @ResponseBody String getGoogleAuthUrl(HttpServletRequest request) throws Exception {

        String reqUrl = googleLoginUrl + "/o/oauth2/v2/auth?client_id=" + googleClientId + "&redirect_uri="
                + googleRedirectUrl + "&response_type=code&scope=email%20profile%20openid&access_type=offline";

        return reqUrl;
    }

    @GetMapping("/redirect/oauth2")
    public ResponseEntity oauthGoogle(HttpServletRequest request,
                              @RequestParam(value = "code") String authCode,
                              HttpServletResponse response) throws Exception{

        RestTemplate restTemplate = new RestTemplate();

        GoogleOAuthRequest googleOAuthRequest =
                GoogleOAuthRequest.builder()
                        .clientId(googleClientId)
                        .clientSecret(googleClientSecret)
                        .code(authCode)
                        .redirectUri(googleRedirectUrl)
                        .grantType("authorization_code")
                        .build();

        ResponseEntity<JSONObject> APIResponse =
                restTemplate.postForEntity(googleAuthUrl + "/token", googleOAuthRequest, JSONObject.class);
        JSONObject responseBody = APIResponse.getBody();

        assert responseBody != null;
        String jwtToken = responseBody.getAsString("id_token");
        String requestUrl = UriComponentsBuilder.fromHttpUrl(googleAuthUrl + "/tokeninfo")
                .queryParam("id_token", jwtToken).toUriString();

        JSONObject resultJson = restTemplate.getForObject(requestUrl, JSONObject.class);

        if(resultJson != null) {
            String emailInfo = resultJson.getAsString("email");
            String temporaryId = emailInfo.substring(0, emailInfo.indexOf("@"));
            String temporaryPw = resultJson.getAsString("sub").substring(0, 15) + "aa@@";
            String temporaryNn = resultJson.getAsString("name");

            if(memberRepository.findByEmail(emailInfo).isPresent()) {
                LoginDto loginDto = new LoginDto(temporaryId, temporaryPw);

                TokenDto tokenDto = authService.login(loginDto);

                response.addHeader("Authorization", tokenDto.getAccessToken());
                response.addHeader("refreshToken", tokenDto.getRefreshToken());

                ResponseDto responseDto = loginMapper.loginDtoToResponse(loginDto);

                return new ResponseEntity<>(
                        new SingleResponseDto<>(responseDto), HttpStatus.OK);
            } else {
                MemberDto.Post memberInfo = new MemberDto.Post(temporaryId, temporaryPw, emailInfo, temporaryNn);
                Member member = memberService.createMember(memberMapper.postToMember(memberInfo));

                LoginDto loginDto = new LoginDto(temporaryId, temporaryPw);

                TokenDto tokenDto = authService.login(loginDto);

                response.addHeader("Authorization", tokenDto.getAccessToken());
                response.addHeader("refreshToken", tokenDto.getRefreshToken());

                ResponseDto responseDto = loginMapper.loginDtoToResponse(loginDto);

                return new ResponseEntity<>(
                        new SingleResponseDto<>(responseDto), HttpStatus.OK);
            }
        } else {
            throw new BusinessLogicException(ExceptionMessage.GOOGLE_USER_INFO_NOT_FOUND);
        }
    }
}
