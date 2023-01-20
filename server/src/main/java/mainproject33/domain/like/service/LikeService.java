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


    public boolean changeBoardLike(Member member, long boardId)
    {
        UserBoard userBoard = boardService.findUserBoard(boardId);

        boolean findLike = checkLikedBoard(member.getId(), boardId);

        if(findLike)
        {
            boardLikeRepository.save(new Like(member, userBoard));
            return true;
        }
        else
        {
            boardLikeRepository.deleteByMemberAndUserBoard(member, userBoard);
            return false;
        }
    }

    public boolean changeCommentLike(Member member, long commentId)
    {
        Comment comment = commentService.findComment(commentId);
        boolean findLike = checkLikedComment(member.getId(), comment.getId());

        if(findLike)
        {
            boardLikeRepository.save(new Like(member, comment));
            return true;
        }

        else
        {
            boardLikeRepository.deleteByMemberAndComment(member, comment);
            return false;
        }
    }

    //좋아요 했는지 여부 검사
    private boolean checkLikedComment(long memberId, long commentId)
    {
        Member member = memberService.findVerifiedMember(memberId);
        Comment comment = commentService.findComment(commentId);

        return boardLikeRepository.findByMemberAndComment(member, comment)
                .isEmpty();
    }

    private boolean checkLikedBoard(long memberId, long boardId)
    {
        Member member = memberService.findVerifiedMember(memberId);
        UserBoard board = boardService.findUserBoard(boardId);

        //비어 있으면 좋아요를 안한 것 true 리턴
        return boardLikeRepository.findByMemberAndUserBoard(member, board)
                .isEmpty();
    }
}