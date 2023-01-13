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
        this.memberId = entity.getMember().getId();
        this.nickname = entity.getMember().getNickname();
        this.id = entity.getId();
        this.content = entity.getContent();
        this.commentCount = entity.getComments().size();
        this.likeCount = entity.getLikes().size();
        this.createdAt = entity.getCreatedAt();
        this.modifiedAt = entity.getModifiedAt();
    }
}