package mainproject33.domain.like.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.like.dto.LikeResponseDto;
import mainproject33.domain.like.entity.Like;
import mainproject33.domain.like.mapper.LikeMapper;
import mainproject33.domain.like.service.LikeService;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.userboard.mapper.UserBoardMapper;
import mainproject33.global.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    private final LikeMapper likeMapper;

    @PostMapping("/boards/{board-id}/likes")
    public ResponseEntity boardLikes(@PathVariable("board-id") @Positive long boardId,
                                     @AuthenticationPrincipal Member member)
    {
        boolean check = likeService.checkLikedBoard(member.getId(), boardId);

        if(check)
        {
            Like like = likeService.upLikeBoard(member.getId(), boardId);
            LikeResponseDto response = likeMapper.userBoardLikeToResponse(like);

            return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
        }

        else
        {
            likeService.unlikeBoard(member.getId(), boardId);
            return new ResponseEntity("좋아요 취소", HttpStatus.OK);
        }
    }

    @PostMapping("/comments/{comment-id}/likes")
    public ResponseEntity commentLikes(@AuthenticationPrincipal Member member,
                                       @PathVariable("comment-id") @Positive long commentId)
    {
        boolean check = likeService.checkLikedComment(member.getId(), commentId);

        if(check)
        {
            Like like = likeService.upLikeComment(member.getId(), commentId);
            LikeResponseDto response = likeMapper.commentLikeToResponse(like);

            return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
        }

        else
        {
            likeService.unlikeComment(member.getId(), commentId);
            return new ResponseEntity("좋아요 취소", HttpStatus.OK);
        }
    }

}
