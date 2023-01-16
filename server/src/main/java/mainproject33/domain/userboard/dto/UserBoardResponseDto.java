package mainproject33.domain.userboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class UserBoardResponseDto
{
    private long memberId;

    private String nickname;
    private long id;

    private String content;

    private String uploadFileName;

    private int commentCount;
    private int likeCount;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}