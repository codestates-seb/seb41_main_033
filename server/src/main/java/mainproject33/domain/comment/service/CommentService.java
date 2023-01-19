package mainproject33.domain.comment.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.comment.repository.CommentRepository;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.repository.BlockRepository;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.userboard.service.UserBoardService;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class CommentService
{
    private final CommentRepository commentRepository;

    private final UserBoardService userBoardService;

    private final BlockRepository blockRepository;

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
    public Page<Comment> findAllCommentsByBoardId(Pageable pageable, long userBoardId, Member member)
    {
        if(member == null)
            return getPagedComments(commentRepository.findAllByUserBoardId(userBoardId), pageable);

        List<Long> blockList = getBlockList(member.getId());
        List<Comment> comments = commentRepository.findAllByUserBoardId(userBoardId);
        List<Comment> filteredComments = filterComments(blockList, comments);

        return getPagedComments(filteredComments, pageable);
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

    //========블랙 리스트 관련 기능========//
    public List<Long> getBlockList(Long blockerId)
    {
        List<Long> blockList = blockRepository.findBlockedIdByBlockerId(blockerId);

        return blockList;
    }

    private Page<Comment> getPagedComments(List<Comment> comments, Pageable pageable)
    {
        int start = (int)pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), comments.size());
        Page<Comment> page = new PageImpl<>(comments.subList(start, end), pageable, comments.size());

        return page;
    }

    public List<Comment> filterComments(List<Long> blockList, List<Comment> comments)
    {
        return comments.stream()
                .filter(comment -> !blockList.contains(comment.getMember().getId()))
                .collect(Collectors.toList());
    }
}
