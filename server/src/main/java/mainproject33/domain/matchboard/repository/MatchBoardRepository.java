package mainproject33.domain.matchboard.repository;

import mainproject33.domain.matchboard.entity.MatchBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MatchBoardRepository extends JpaRepository<MatchBoard, Long> {
    @Query(value = "select * from MATCH_BOARD where title like %:keyword% or content like %:keyword%", nativeQuery = true)
    Page<MatchBoard> findByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
