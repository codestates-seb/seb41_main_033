package mainproject33.domain.userboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import mainproject33.domain.comment.dto.CommentResponseDto;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.member.entity.ProfileImage;

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

    private ProfileImage image;
    private long id;

    private String content;

    private String uploadFileName;

    private int commentCount;
    private int likeCount;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private List<CommentResponseDto> comments = new ArrayList<>();
}