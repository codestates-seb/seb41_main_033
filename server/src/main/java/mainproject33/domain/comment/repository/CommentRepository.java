package mainproject33.domain.comment.repository;

import mainproject33.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>
{
    List<Comment> findAllByUserBoardId(long userBoardId);

    Page<Comment> findAllByMemberId(Pageable pageable, long memberId);

}
