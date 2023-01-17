package mainproject33.domain.member.repository;

import mainproject33.domain.member.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    @Query(value = "SELECT * FROM LIKES WHERE LIKER_ID = :likerId AND LIKING_ID = :likingId", nativeQuery = true)
    Optional<Likes> findByLikes(Long likerId, Long likingId);

    List<Likes> findByLikerId(Long likerId);
}
