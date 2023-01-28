package mainproject33.domain.userboard.repository;

import mainproject33.domain.userboard.entity.UserBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBoardRepository extends JpaRepository<UserBoard, Long>
{
    @Query(value = "select * from user_board where content like %:keyword% order by id desc", nativeQuery = true)
    List<UserBoard> findByKeyword(@Param("keyword") String keyword);

    @Override
    @Query(value = "select * from user_board order by id desc", nativeQuery = true)
    List<UserBoard> findAll();

    @Query(value = "select * from user_board where member_id = :memberId", nativeQuery = true)
    Page<UserBoard> findByMemberId(@Param("memberId")Long memberId, Pageable pageable);

    //follow 한 유저 쿼리로 가져오기
    @Query(value =
            "select * from user_board u " +
                    "inner join follow f " +
                    "where u.member_id = f.followed_id " +
                    "and f.follower_id = :followerId ",
            nativeQuery = true
    )
    Page<UserBoard> findByFollowerId(Pageable pageable, @Param("followerId")Long followerId);

    @Query(value =
            "select * from user_board u " +
                    "inner join follow f " +
                    "where u.member_id = f.followed_id " +
                    "and f.follower_id = :followerId " +
                    "and content like %:keyword%",
            nativeQuery = true
    )
    Page<UserBoard> findByFollowerIdWithKeyword(@Param("keyword")String keyword, Pageable pageable, @Param("followerId")Long followerId);
}
