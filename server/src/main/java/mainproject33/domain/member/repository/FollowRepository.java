package mainproject33.domain.member.repository;

import mainproject33.domain.member.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    @Query(value = "SELECT * FROM FOLLOW WHERE FOLLOWER_ID = :followerId AND FOLLOWED_ID = :followedId", nativeQuery = true)
    Optional<Follow> findByFollow(Long followerId, Long followedId);
    List<Follow> findByFollowerId(Long followerId);
    List<Follow> findByFollowedId(Long followedId);
}
