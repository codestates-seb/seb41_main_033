package mainproject33.domain.userboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import mainproject33.domain.boardfile.UserBoardFile;
import mainproject33.domain.boardfile.UserBoardFileRepository;
import mainproject33.domain.userboard.entity.UserBoard;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class UserBoardResponseDto
{
    private long memberId;

    private String nickname;
    private long id;

    private String content;

    private List<String> uploadFileNames;

    private int commentCount;
    private int likeCount;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}