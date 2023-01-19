package mainproject33.domain.member.repository;

import mainproject33.domain.member.entity.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlockRepository extends JpaRepository<Block, Long> {

    @Query(value = "SELECT * FROM BLOCK WHERE BLOCKER_ID = :blockerId AND BLOCKED_ID = :blockedId", nativeQuery = true)
    Optional<Block> findByBlock(Long blockerId, Long blockedId);

    @Query(value = "SELECT * FROM BLOCK WHERE BLOCKER_ID = :blockerId", nativeQuery = true)
    List<Block> findByBlockList(Long blockerId);

}
