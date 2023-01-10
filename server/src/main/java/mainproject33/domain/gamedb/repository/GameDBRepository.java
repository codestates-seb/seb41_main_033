package mainproject33.domain.gamedb.repository;

import mainproject33.domain.gamedb.entity.GameDB;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameDBRepository extends JpaRepository<GameDB, Long> {
}
