package mainproject33.domain.matchboard.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MatchBoardDto {

    @Getter
    @Setter
    public static class Post {

        @NotBlank(message  = "제목은 필수 입력 값입니다.")
        @Length(max = 30, message = "제목은 최대 30자 까지 입력 가능합니다.")
        private String title;
        @NotBlank(message  = "내용은 필수 입력 값입니다.")
        @Length(max = 500, message = "내용은  최대 500자 까지 입력 가능합니다.")
        private String content;
    }

    @Getter
    @Setter
    public static class Patch {
        private long id;
        @NotBlank(message  = "제목은 필수 입력 값입니다.")
        @Length(max = 30, message = "제목은 최대 30자 까지 입력 가능합니다.")
        private String title;
        @NotBlank(message  = "내용은 필수 입력 값입니다.")
        @Length(max = 500, message = "내용은  최대 500자 까지 입력 가능합니다.")
        private String content;
    }

    @Getter
    @Setter
    public static class Response {
        private long memberId;
        private String nickname;
        private long id;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
