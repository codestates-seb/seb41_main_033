package mainproject33.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "이메일에는 공백이 올 수 없습니다.")
        @Email(message = "이메일 형식을 맞춰 주셔야 합니다.")
        private String email;

        @NotBlank(message = "패스워드에는 공백이 올 수 없습니다.")
        private String password;

        @NotBlank(message = "닉네임에는 공백이 올 수 없습니다.")
        private String nickname;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private String nickname;
        private String image;
        private String introduction;
        private String game;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String email;
        private String password;
        private String nickname;
        private String image;
        private String introduction;
        private String game;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
