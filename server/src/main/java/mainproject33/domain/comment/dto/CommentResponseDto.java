package mainproject33.domain.comment.dto;

import lombok.Getter;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.member.entity.Member;

import java.time.LocalDateTime;

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

    public CommentResponseDto(Comment entity)
    {
        this.memberId = entity.getMember().getId();
        this.nickname = entity.getMember().getNickname();
        this.userBoardId = entity.getUserBoard().getId();
        this.id = entity.getId();
        this.content = entity.getContent();
        this.likeCount = entity.getLikeCount();
        this.createdAt = entity.getCreatedAt();
        this.modifiedAt = entity.getModifiedAt();
    }
}
