package mainproject33.global.security.dto;

import lombok.Getter;

@Getter
public class LoginDto { // 클라이언트 요청데이터를 역직렬화

    private String email;
    private String password;

}
