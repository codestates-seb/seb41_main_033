package mainproject33.domain.member.repository;

import mainproject33.domain.member.entity.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlockRepository extends JpaRepository<Block, Long> {

    @Query(value = "select * from block where blocker_id = :blockerId and blocked_id = :blockedId", nativeQuery = true)
    Optional<Block> findByBlock(Long blockerId, Long blockedId);

    @Query(value = "select * from block where blocker_id = :blockerId", nativeQuery = true)
    List<Block> findByBlockList(Long blockerId);
    @Query(value = "select * from block where blocker_id = :memberId or blocked_id = :memberId", nativeQuery = true)
    List<Block> findByAllBlockList(Long memberId);

    @Query(value = "select blocked_id from block where blocker_id = :blockerId", nativeQuery = true)
    List<Long> findBlockedIdByBlockerId(Long blockerId);

}
