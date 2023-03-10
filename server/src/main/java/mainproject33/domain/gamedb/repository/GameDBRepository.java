package mainproject33.domain.gamedb.repository;

import mainproject33.domain.gamedb.entity.GameDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GameDBRepository extends JpaRepository<GameDB, Long> {
    @Query(value = "select * from game_db where lower(replace(kor_title, ' ', '')) like %:keyword%" +
            " or lower(replace(eng_title, ' ', '')) like %:keyword%", nativeQuery = true)
    List<GameDB> findByKeyword(@Param("keyword") String keyword);
    GameDB findByKorTitle(String korTitle);
}