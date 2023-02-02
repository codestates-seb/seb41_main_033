package mainproject33.domain.like.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.comment.service.CommentService;
import mainproject33.domain.like.entity.Like;
import mainproject33.domain.like.repository.LikeRepository;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.service.MemberService;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.userboard.service.UserBoardService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class LikeService
{
    private final LikeRepository boardLikeRepository;

    private final MemberService memberService;

    private final UserBoardService boardService;

    private final CommentService commentService;


    public boolean changeBoardLike(Member user, long boardId)
    {
        UserBoard userBoard = boardService.findUserBoard(boardId);

        boolean findLike = checkLikedBoard(user.getId(), boardId);

        if(findLike)
        {
            boardLikeRepository.save(new Like(user, userBoard));
            return true;
        }
        else
        {
            boardLikeRepository.deleteByMemberAndUserBoard(user, userBoard);
            return false;
        }
    }

    public boolean changeCommentLike(Member user, long commentId)
    {
        Comment comment = commentService.findComment(commentId);
        boolean findLike = checkLikedComment(user.getId(), comment.getId());

        if(findLike)
        {
            boardLikeRepository.save(new Like(user, comment));
            return true;
        }

        else
        {
            boardLikeRepository.deleteByMemberAndComment(user, comment);
            return false;
        }
    }

    //좋아요 했는지 여부 검사
    private boolean checkLikedComment(long memberId, long commentId)
    {
        Member member = memberService.findMember(memberId);
        Comment comment = commentService.findComment(commentId);

        return boardLikeRepository.findByMemberAndComment(member, comment)
                .isEmpty();
    }

    private boolean checkLikedBoard(long memberId, long boardId)
    {
        Member member = memberService.findMember(memberId);
        UserBoard board = boardService.findUserBoard(boardId);

        //비어 있으면 좋아요를 안한 것 true 리턴
        return boardLikeRepository.findByMemberAndUserBoard(member, board)
                .isEmpty();
    }
}