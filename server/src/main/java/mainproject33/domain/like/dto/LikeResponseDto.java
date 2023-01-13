package mainproject33.domain.like.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import mainproject33.domain.like.entity.Like;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Getter
public class LikeResponseDto
{
    private Long memberId;

    private String nickname;
    private Long boardId;

    private Long commentId;

    private LocalDateTime createdAt;
}