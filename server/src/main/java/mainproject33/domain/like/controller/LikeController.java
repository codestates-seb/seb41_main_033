package mainproject33.domain.like.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.like.service.LikeService;
import mainproject33.domain.member.entity.Member;
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
@RequestMapping("/api/boards")
public class LikeController
{
    private final LikeService likeService;

    @PostMapping("/{board-id}/likes")
    public ResponseEntity boardLikes(@PathVariable("board-id") @Positive long boardId,
                                     @AuthenticationPrincipal Member user)
    {
        boolean response = likeService.changeBoardLike(user, boardId);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping("/comments/{comment-id}/likes")
    public ResponseEntity commentLikes(@PathVariable("comment-id") @Positive long commentId,
                                       @AuthenticationPrincipal Member user)
    {
        boolean response = likeService.changeCommentLike(user, commentId);

        return new ResponseEntity(response, HttpStatus.OK);
    }
}