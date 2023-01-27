package mainproject33.global.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.comment.repository.CommentRepository;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.repository.MemberRepository;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.userboard.repository.UserBoardRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class VerificationService {
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final UserBoardRepository userBoardRepository;

    // 해당 엔티티가 존재하는지 확인
    public void existComment(long id)
    {
        Optional<Comment> findComment = commentRepository.findById(id);
        if (findComment.isEmpty())
            throw new BusinessLogicException(ExceptionMessage.COMMENT_NOT_FOUND);
    }

    public void existIdentifier(String identifier) {
        Optional<Member> member = memberRepository.findByIdentifier(identifier);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionMessage.MEMBER_EXISTS);
    }

    public void existEmail(String email)
    {
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isEmpty())
            throw new BusinessLogicException(ExceptionMessage.MEMBER_NOT_FOUND);
    }

    public void existBoard(Long id)
    {
        Optional<UserBoard> findBoard = userBoardRepository.findById(id);

        if(findBoard.isEmpty())
        {
            throw new BusinessLogicException(ExceptionMessage.USER_BOARD_NOT_FOUND);
        }
    }

    // 현재 유저의 각 엔티티의 작성자 인지 확인
    public void userIsMember(Long memberId, Long userId) {
        if(memberId != userId) {
            throw new BusinessLogicException(ExceptionMessage.MEMBER_UNAUTHORIZED);
        }
    }

    public void userIsCommentator(Member user, long id)
    {
        Comment comment = commentRepository.findById(id).orElseThrow(() ->
                new BusinessLogicException(ExceptionMessage.COMMENT_NOT_FOUND));

        if(comment.getMember().getId() != user.getId())
            throw new BusinessLogicException(ExceptionMessage.MEMBER_UNAUTHORIZED);
    }

    public void userIsUserBoardWriter(Member user, long id)
    {
        UserBoard userBoard = userBoardRepository.findById(id).orElseThrow(() ->
                new BusinessLogicException(ExceptionMessage.USER_BOARD_NOT_FOUND));

        if(userBoard.getMember().getId() != user.getId())
        {
            throw new BusinessLogicException(ExceptionMessage.MEMBER_UNAUTHORIZED);
        }
    }

    public boolean userIsMatchBoardWriter(Member user, MatchBoard matchBoard) {
        return matchBoard.getMember().getId() == user.getId();
    }

    // Self Follow, Like, Block
    public void userSelfFollows(Long followerId, Long followedId) {
        if (followerId == followedId) {
            throw new BusinessLogicException(ExceptionMessage.SELF_FOLLOW_NOT_ALLOWED);
        }
    }

    public void userSelfLikes(Long likerId, Long likedId) {
        if(likerId == likedId) {
            throw new BusinessLogicException(ExceptionMessage.SELF_LIKE_NOT_ALLOWED);
        }
    }

    public void userSelfBlocks(Long blockerId, Long blockedId) {
        if (blockerId == blockedId) {
            throw new BusinessLogicException(ExceptionMessage.SELF_BLOCK_NOT_ALLOWED);
        }
    }
}
