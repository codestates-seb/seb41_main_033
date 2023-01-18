package mainproject33.domain.userboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import mainproject33.domain.comment.dto.CommentResponseDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class UserBoardResponseDto
{
    private long memberId;

    private String identifier;

    private String nickname;

    private String image;

    private long id;

    private String content;

    private String uploadFileName;

    private String contentType;

    private int commentCount;

    private int likeCount;

    private boolean likeStatus;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private List<CommentResponseDto> comments = new ArrayList<>();
}