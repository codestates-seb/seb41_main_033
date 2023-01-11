package mainproject33.domain.like.repository;

import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long>
{
    Optional<Like> findByMemberAndUserBoard(Member member, UserBoard userBoard);

    Optional<Like> findByMemberAndComment(Member member, Comment comment);

    void deleteByMemberAndUserBoard(Member member, UserBoard userBoard);

    void deleteByMemberAndComment(Member member, Comment comment);


}
