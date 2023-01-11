package mainproject33.domain.userboard.dto;

import lombok.Builder;
import lombok.Getter;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.userboard.entity.UserBoard;

import java.time.LocalDateTime;

@Getter
public class UserBoardResponseDto
{
    private long memberId;

    private String nickname;
    private long id;

    private String content;

    private int commentCount;
    private int likeCount;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
    public UserBoardResponseDto(UserBoard entity)
    {
        this.memberId = userBoardMemberId(entity);
        this.nickname = userBoardNickname(entity);
        this.id = entity.getId();
        this.content = entity.getContent();
        this.commentCount = entity.getComments().size();
        this.likeCount = entity.getLikes().size();
        this.createdAt = entity.getCreatedAt();
        this.modifiedAt = entity.getModifiedAt();
    }

    private long userBoardMemberId(UserBoard entity)
    {
        if(entity == null)
            return 1L;

        Member member = entity.getMember();
        if(member == null)
            return 1L;

        long id = member.getId();
        return id;
    }

    private String userBoardNickname(UserBoard entity)
    {
        if(entity == null)
            return null;

        Member member = entity.getMember();
        if(member == null)
            return "JohnDoe";

        String nickname = member.getNickname();
        return nickname;
    }
}