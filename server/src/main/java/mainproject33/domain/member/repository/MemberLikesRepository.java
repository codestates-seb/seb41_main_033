package mainproject33.domain.member.repository;

import mainproject33.domain.member.entity.MemberLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberLikesRepository extends JpaRepository<MemberLikes, Long> {
    @Query(value = "SELECT * FROM MEMBER_LIKES WHERE LIKER_ID = :likerId AND LIKED_ID = :likedId", nativeQuery = true)
    Optional<MemberLikes> findByMemberLikes(Long likerId, Long likedId);

    List<MemberLikes> findByLikedId(Long likedId);
}
