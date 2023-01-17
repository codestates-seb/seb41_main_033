package mainproject33.domain.member.repository;

import mainproject33.domain.member.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    @Query(value = "SELECT * FROM FOLLOW WHERE TAKER_ID = :takerId AND GIVER_ID = :giverId", nativeQuery = true)

    Optional<Follow> findByFollow(Long takerId, Long giverId);
    List<Follow> findByTakerId(Long takerId);
    List<Follow> findByGiverId(Long giverId);
}
