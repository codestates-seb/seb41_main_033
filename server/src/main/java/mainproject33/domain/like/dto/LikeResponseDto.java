package mainproject33.domain.like.dto;

import lombok.Getter;
import mainproject33.domain.like.entity.Like;

@Getter
public class LikeResponseDto
{
    private Long memberId;

    private String nickname;
    private Long boardId;

    public LikeResponseDto(Like entity)
    {
        if(entity.getMember().getId() == null)
            this.memberId = null;

        if(entity.getMember().getNickname() == null)
            this.nickname = null;

        if(entity.getUserBoard().getId() == null)
            this.boardId = null;

        this.memberId = entity.getMember().getId();
        this.nickname = entity.getMember().getNickname();
        this.boardId = entity.getUserBoard().getId();
    }
}