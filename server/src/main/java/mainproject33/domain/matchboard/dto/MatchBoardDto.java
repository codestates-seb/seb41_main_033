package mainproject33.domain.matchboard.dto;

import lombok.Getter;
import lombok.Setter;
import mainproject33.domain.gamedb.entity.GameDB;
import mainproject33.global.validator.tags.Tags;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

        @NotBlank(message  = "게임은 필수 입력 값입니다.")
        private String game;

        @NotNull(message  = "팀원 수는 필수 입력 값입니다.")
        @Max(24)
        private int team;

        @Tags
        @Size(max = 3)
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

        private String game;

        @Max(24)
        private int team;

        @Tags
        @Size(max = 3)
        private List<String> tags = new LinkedList<>();
    }

    @Getter
    @Setter
    public static class Response {
        private long memberId;
        private String identifier;
        private String nickname;
        private String image;
        private long id;
        private String title;
        private String content;
        private GameDB game;
        private int team;
        private List<String> tags;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
