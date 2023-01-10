package mainproject33.domain.userboard.repository;

import mainproject33.domain.userboard.entity.UserBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBoardRepository extends JpaRepository<UserBoard, Long>
{
}
