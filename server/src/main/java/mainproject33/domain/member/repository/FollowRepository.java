package mainproject33.domain.member.repository;

import mainproject33.domain.member.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    @Query(value = "select * from follow where follower_id = :followerId and followed_id = :followedId", nativeQuery = true)
    Optional<Follow> findByFollow(Long followerId, Long followedId);
}
