package mainproject33.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.member.entity.Member;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Getter
public class CommentResponseDto
{
    private Long memberId;

    private String nickname;

    private Long userBoardId;

    private Long id;

    private String content;

    private int likeCount;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}
