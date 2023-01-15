package mainproject33.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import mainproject33.domain.member.entity.Profile;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "이메일에는 공백이 올 수 없습니다.")
        private String identifier;

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
        private List<String> games;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String identifier;
        private String password;
        private String nickname;
        private Profile profile;

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
