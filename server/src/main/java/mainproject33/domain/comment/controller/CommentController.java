package mainproject33.domain.comment.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.comment.dto.CommentPatchDto;
import mainproject33.domain.comment.dto.CommentPostDto;
import mainproject33.domain.comment.dto.CommentResponseDto;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.comment.mapper.CommentMapper;
import mainproject33.domain.comment.service.CommentService;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.service.MemberService;
import mainproject33.global.dto.MultiResponseDto;
import mainproject33.global.dto.SingleResponseDto;
import mainproject33.global.service.VerificationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/boards")
@RestController
public class CommentController
{
    private final CommentService commentService;
    private final MemberService memberService;
    private final CommentMapper mapper;
    private final VerificationService verify;

    @PostMapping("/{board-id}/comments")
    public ResponseEntity postComment(@PathVariable("board-id") @Positive long boardId,
                                      @Valid @RequestBody CommentPostDto request,
                                      @AuthenticationPrincipal Member user)
    {
        Member findMember = memberService.findMember(user.getId());

        Comment comment = commentService.postComment(boardId, mapper.commentPostToComment(request), findMember);

        CommentResponseDto response = mapper.commentToResponse(comment, user);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid@RequestBody CommentPatchDto request,
                                       @AuthenticationPrincipal Member user)
    {
        verify.userIsCommentator(user, commentId);

        request.setId(commentId);
        Comment comment = commentService.updateComment(mapper.commentPatchToComment(request));

        CommentResponseDto response = mapper.commentToResponse(comment, user);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/comments/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId,
                                     @AuthenticationPrincipal Member user)
    {
        Comment comment = commentService.findComment(commentId);

        CommentResponseDto response = mapper.commentToResponse(comment, user);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{board-id}/comments")
    public ResponseEntity getComments(@PageableDefault(size = 15, sort = "id", direction = Sort.Direction.ASC)Pageable pageable,
                                      @PathVariable("board-id") @Positive long boardId,
                                      @AuthenticationPrincipal Member user)
    {
        Page<Comment> pageComments = commentService.findAllCommentsByBoardId(pageable.previousOrFirst(), boardId, user);
        List<Comment> comments = pageComments.getContent();

        List<CommentResponseDto> responses = mapper.commentToResponses(comments, user);

        return new ResponseEntity(new MultiResponseDto<>(responses, pageComments), HttpStatus.OK);
    }

    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId,
                                        @AuthenticationPrincipal Member user)
    {
        verify.userIsCommentator(user, commentId);
        commentService.deleteComment(commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
