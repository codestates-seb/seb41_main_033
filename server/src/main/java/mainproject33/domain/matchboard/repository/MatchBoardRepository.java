package mainproject33.domain.matchboard.repository;

import mainproject33.domain.matchboard.entity.MatchBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MatchBoardRepository extends JpaRepository<MatchBoard, Long> {
    @Query(value = "select * from match_board where title like %:keyword% or content like %:keyword% order by id desc", nativeQuery = true)
    List<MatchBoard> findByKeyword(@Param("keyword") String keyword);

    @Override
    @Query(value = "select * from match_board order by id desc", nativeQuery = true)
    List<MatchBoard> findAll();

    @Query(value = "select * from match_board where member_id = :memberId", nativeQuery = true)
    Page<MatchBoard> findByMemberId(@Param("memberId")Long memberId, Pageable pageable);
}
