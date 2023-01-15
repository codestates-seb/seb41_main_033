package mainproject33.domain.comment.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.comment.repository.CommentRepository;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.userboard.service.UserBoardService;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class CommentService
{
    private final CommentRepository commentRepository;

    private final UserBoardService userBoardService;

    public Comment postComment(long userBoardId, Comment request, Member member)
    {
        UserBoard userBoard = userBoardService.findUserBoard(userBoardId);
        request.addUserBoard(userBoard);
        request.addMember(member);

        return commentRepository.save(request);
    }

    public Comment updateComment(Comment request)
    {
        Comment findComment = findComment(request.getId());


        Optional.ofNullable(request.getContent())
                .ifPresent(findComment::updateComment);

        return findComment;
    }

    @Transactional(readOnly = true)
    public Comment findComment(long id)
    {
        Optional<Comment> findComment = commentRepository.findById(id);

        Comment comment = findComment.orElseThrow(() -> new BusinessLogicException(ExceptionMessage.COMMENT_NOT_FOUND));


        return comment;
    }

    @Transactional(readOnly = true)
    public Page<Comment> findAllCommentsByBoardId(int page, int size, long userBoardId)
    {
        return commentRepository.findAllByUserBoardId(PageRequest.of(page, size, Sort.by("likeCount").descending()), userBoardId);
    }

    //api 논의 필요
    @Transactional(readOnly = true)
    public Page<Comment> findAllCommentsByMemberId(int page, int size, long memberId)
    {
        return commentRepository.findAllByMemberId(PageRequest.of(page, size, Sort.by("id").ascending()), memberId);
    }


    public void deleteComment(long id)
    {
        verifyExistComment(id);

        commentRepository.deleteById(id);
    }

    public void verifyExistComment(long id)
    {
        Optional<Comment> findComment = commentRepository.findById(id);
        if (findComment.isEmpty())
            throw new BusinessLogicException(ExceptionMessage.COMMENT_NOT_FOUND);
    }

    public void verifyMember(Member member, long id)
    {
        Comment comment = findComment(id);

        if(comment.getMember().getId() != member.getId())
            throw new BusinessLogicException(ExceptionMessage.MEMBER_UNAUTHORIZED);
    }
}
