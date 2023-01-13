package mainproject33.domain.like.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.comment.service.CommentService;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.service.MemberService;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.like.entity.Like;
import mainproject33.domain.like.repository.LikeRepository;
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

    public Like upLikeBoard(long memberId, long boardId)
    {
        UserBoard userBoard = boardService.findUserBoard(boardId);
        Member member = memberService.findVerifiedMember(memberId);

        Like boardLike = boardLikeRepository.save(new Like(member, userBoard));


        return boardLike;
    }

    public void unlikeBoard(long memberId, long boardId)
    {
        UserBoard userBoard = boardService.findUserBoard(boardId);
        Member member = memberService.findVerifiedMember(memberId);

        userBoard.unLike();
        boardLikeRepository.deleteByMemberAndUserBoard(member, userBoard);
    }

    public Like upLikeComment(long memberId, long commentId)
    {
        Member member = memberService.findVerifiedMember(memberId);
        Comment comment = commentService.findComment(commentId);

        return boardLikeRepository.save(new Like(member, comment));
    }

    public void unlikeComment(long memberId, long commentId)
    {
        Member member = memberService.findVerifiedMember(memberId);
        Comment comment = commentService.findComment(commentId);

        comment.unlike();
        boardLikeRepository.deleteByMemberAndComment(member, comment);
    }



    /**
     * 좋아요 했느지 여부 검사
     */
    public boolean checkLikedComment(long memberId, long commentId)
    {
        Member member = memberService.findVerifiedMember(memberId);
        Comment comment = commentService.findComment(commentId);

        return boardLikeRepository.findByMemberAndComment(member, comment)
                .isEmpty();
    }
    public boolean checkLikedBoard(long memberId, long boardId)
    {
        Member member = memberService.findVerifiedMember(memberId);
        UserBoard board = boardService.findUserBoard(boardId);

        return boardLikeRepository.findByMemberAndUserBoard(member, board)
                .isEmpty();
    }
}