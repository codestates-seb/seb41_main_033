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

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    public CommentResponseDto(Comment entity)
    {
        this.memberId = commentMemberId(entity);
        this.nickname = commentMemberNickname(entity);
        this.userBoardId = entity.getUserBoard().getId();
        this.id = entity.getId();
        this.content = entity.getContent();
        this.createdAt = entity.getCreatedAt();
        this.modifiedAt = entity.getModifiedAt();
    }

    private long commentMemberId(Comment entity)
    {
        if(entity == null)
            return 1L;

        Member member = entity.getMember();

        if(member == null)
            return 1L;

        long id = member.getId();

        return id;
    }

    public String commentMemberNickname(Comment entity)
    {
        if(entity == null)
            return "JohnDoe";

        Member member = entity.getMember();

        if(member == null)
            return "JohnDoe";

        String nickname = member.getNickname();
        return nickname;
    }
}
