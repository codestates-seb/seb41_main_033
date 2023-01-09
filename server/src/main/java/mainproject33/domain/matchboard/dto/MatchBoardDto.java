package mainproject33.domain.matchboard.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class MatchBoardDto {

    @Getter
    @Setter
    public static class Post {
        private String title;
        private String content;
    }

    @Getter
    @Setter
    public static class Patch {
        private long id;
        private String title;
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
