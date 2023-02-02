package mainproject33.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Getter
public class CommentResponseDto
{
    private Long memberId;

    private String identifier;
    private String nickname;

    private String profileImage;
    private Long userBoardId;

    private Long id;

    private String content;

    private int likeCount;

    private boolean likeStatus;
    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}
