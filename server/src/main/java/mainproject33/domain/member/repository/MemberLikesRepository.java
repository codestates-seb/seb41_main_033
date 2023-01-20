package mainproject33.domain.member.repository;

import mainproject33.domain.member.entity.MemberLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberLikesRepository extends JpaRepository<MemberLikes, Long> {
    @Query(value = "select * from member_likes where liker_id = :likerId and liked_id = :likedId", nativeQuery = true)
    Optional<MemberLikes> findByMemberLikes(Long likerId, Long likedId);

    @Query(value = "select * from member_likes where liker_id = :memberId or liked_id = :memberId", nativeQuery = true)
    List<MemberLikes> findByAllMemberLikeList(Long memberId);

    @Query(value = "select * from member_likes where liked_id = :likedId", nativeQuery = true)
    List<MemberLikes> findByLikedList(Long likedId);
}
