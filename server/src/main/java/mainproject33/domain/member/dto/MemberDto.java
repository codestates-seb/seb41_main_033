package mainproject33.domain.member.dto;

import lombok.Getter;
import lombok.Setter;
import mainproject33.domain.gamedb.entity.GameDB;
import mainproject33.domain.matchboard.dto.MatchBoardDto;
import mainproject33.domain.userboard.dto.UserBoardResponseDto;
import mainproject33.global.validator.identifier.Identifier;
import mainproject33.global.validator.nickname.Nickname;
import mainproject33.global.validator.notspace.NotSpace;
import mainproject33.global.validator.password.Password;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {

    @Getter
    public static class Post {

        @NotBlank(message = "아이디에는 공백이 올 수 없습니다.")
        @Identifier
        private String identifier;

        @NotBlank(message = "패스워드에는 공백이 올 수 없습니다.")
        @Password
        private String password;

        @NotBlank(message = "닉네임에는 공백이 포함될 수 없습니다.")
        @Nickname
        private String nickname;
    }

    @Getter
    public static class Patch {

        @NotSpace
        @Nickname
        private String nickname;
        private String image;
        private String introduction;
        @Size(max = 5)
        private List<String> games;
    }

    @Getter
    @Setter
    public static class Response {

        private Long id;
        private String identifier;
        private String password;
        private String nickname;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Getter
    @Setter
    public static class ProfileResponse {

        private Long id;
        private String identifier;
        private String nickname;
        private String profileImage;
        private int followerCount;
        private int followingCount;
        private boolean followStatus;
        private int likeCount;
        private boolean likeStatus;
        private boolean blockStatus;
        private String introduction;
        private List<GameDB> games;
        private List<MatchBoardDto.Response> matchBoards;
        private List<UserBoardResponseDto> userBoards;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

}
