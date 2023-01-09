package mainproject33.domain.matchboard.dto;

import lombok.Getter;
import lombok.Setter;
import mainproject33.domain.matchboard.utils.validator.Tags;
import org.hibernate.validator.constraints.Length;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

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
        @Tags
        @Size(max = 5)
        private List<String> tags = new LinkedList<>();
    }

    @Getter
    @Setter
    public static class Patch {
        private long id;
        @Length(max = 30, message = "제목은 최대 30자 까지 입력 가능합니다.")
        private String title;
        @Length(max = 500, message = "내용은  최대 500자 까지 입력 가능합니다.")
        private String content;
        @Tags
        @Size(max = 5)
        private List<String> tags = new LinkedList<>();
    }

    @Getter
    @Setter
    public static class Response {
        private long memberId;
        private String nickname;
        private long id;
        private String title;
        private String content;
        private List<String> tags;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
