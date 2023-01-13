package mainproject33.domain.member.repository.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "아이디에는 공백이 올 수 없습니다.")
        @Pattern(regexp = "^[A-z0-9가-힣]{4,16}$",
                message = "아이디는 특수문자가 포함될 수 없으며, 4 ~ 16자 까지만 입력이 가능합니다.")
        private String identifier;

        @NotBlank(message = "패스워드에는 공백이 올 수 없습니다.")
        @Pattern(regexp = "^(?=.*[A-z])(?=.*\\d)(?=.*[~!@])[A-z\\d~!@]{8,20}$",
                message = "패스워드는 영어, 숫자, 특수문자를 하나 씩 포함해야 하며, 8 ~ 20자 까지만 입력이 가능합니다.")
        private String password;

        @NotBlank(message = "닉네임에는 공백이 포함될 수 없습니다.")
        @Pattern(regexp = "^[A-z0-9가-힣]{2,8}$",
                message = "닉네임은 특수문자가 포함될 수 없으며, 2 ~ 8자 까지만 입력이 가능합니다.")
        private String nickname;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

        @NotBlank(message = "닉네임에는 공백이 포함될 수 없습니다.")
        @Pattern(regexp = "^[A-z0-9가-힣]{2,8}$",
                message = "닉네임은 특수문자가 포함될 수 없으며, 2 ~ 8자 까지만 입력이 가능합니다.")
        private String nickname;
        private String image;
        private String introduction;
        private String game;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String identifier;
        private String password;
        private String nickname;
        private String image;
        private String introduction;
        private String game;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
