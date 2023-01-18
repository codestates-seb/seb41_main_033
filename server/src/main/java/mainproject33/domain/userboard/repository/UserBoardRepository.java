package mainproject33.domain.userboard.repository;

import mainproject33.domain.userboard.entity.UserBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBoardRepository extends JpaRepository<UserBoard, Long>
{

    @Query(value = "select * from user_board where content like %:keyword%", nativeQuery = true)
    Page<UserBoard> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query(value = "SELECT * FROM USER_BOARD WHERE MEMBER_ID = :memberId", nativeQuery = true)
    Page<UserBoard> findByMemberId(@Param("memberId")Long memberId, Pageable pageable);
}
