package mainproject33.domain.like.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.like.dto.LikeResponseDto;
import mainproject33.domain.like.entity.Like;
import mainproject33.domain.like.service.LikeService;
import mainproject33.domain.userboard.mapper.UserBoardMapper;
import mainproject33.global.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class LikeController
{

    private final LikeService likeService;

    private final UserBoardMapper boardMapper;

    @PostMapping("/boards/{board-id}/members/{member-id}/likes")
    public ResponseEntity boardLikes(@PathVariable("board-id") @Positive long boardId,
                                    @PathVariable("member-id") @Positive long memberId)
    {
        boolean check = likeService.checkLikedBoard(memberId, boardId);

        if(check)
        {
            Like like = likeService.upLikeBoard(memberId, boardId);
            LikeResponseDto response = boardMapper.userBoardLikeToResponse(like);
            return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
        }

        else
        {
            likeService.unlikeBoard(memberId, boardId);
            return new ResponseEntity(new SingleResponseDto<>("좋아요 취소"), HttpStatus.OK);
        }
    }

    @PostMapping("/comments/{comment-id}/members/{member-id}/likes")
    public ResponseEntity commentLikes(@PathVariable("member-id") @Positive long memberId,
                                       @PathVariable("comment-id") @Positive long commentId)
    {
        boolean check = likeService.checkLikedComment(memberId, commentId);

        if(check)
        {
            likeService.upLikeComment(memberId, commentId);

            return new ResponseEntity(new SingleResponseDto<>("좋아요 성공"), HttpStatus.OK);
        }

        else
        {
            likeService.unlikeComment(memberId, commentId);
            return new ResponseEntity(new SingleResponseDto<>("좋아요 취소"), HttpStatus.OK);
        }
    }

}
