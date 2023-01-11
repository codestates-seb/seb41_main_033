package mainproject33.domain.comment.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.comment.dto.CommentPatchDto;
import mainproject33.domain.comment.dto.CommentPostDto;
import mainproject33.domain.comment.dto.CommentResponseDto;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.comment.mapper.CommentMapper;
import mainproject33.domain.comment.service.CommentService;
import mainproject33.global.dto.MultiResponseDto;
import mainproject33.global.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/boards/{board-id}/comments")
@RestController
public class CommentController
{
    private final CommentService commentService;

    private final CommentMapper mapper;
    @PostMapping
    public ResponseEntity postComment(@PathVariable("board-id") @Positive long boardId,
                                      @Valid @RequestBody CommentPostDto request)
    {
        Comment comment = commentService.postComment(boardId, mapper.commentPostToComment(request));

        CommentResponseDto response = mapper.commentToResponse(comment);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid@RequestBody CommentPatchDto request)
    {
        request.setId(commentId);
        Comment comment = commentService.updateComment(mapper.commentPatchToComment(request));

        CommentResponseDto response = mapper.commentToResponse(comment);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId)
    {
        Comment comment = commentService.findComment(commentId);

        CommentResponseDto response = mapper.commentToResponse(comment);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getComments(@PathVariable("board-id") @Positive long boardId,
                                      @RequestParam @Positive int page,
                                      @RequestParam @Positive int size)
    {
        Page<Comment> pageComments = commentService.findAllCommentsByBoardId(page - 1, size, boardId);
        List<Comment> comments = pageComments.getContent();

        List<CommentResponseDto> responses = mapper.commentToResponses(comments);

        return new ResponseEntity(new MultiResponseDto<>(responses, pageComments), HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId)
    {
        commentService.deleteComment(commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}