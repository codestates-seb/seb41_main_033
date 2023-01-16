package mainproject33.domain.boardfile.repository;

import mainproject33.domain.boardfile.entity.UserBoardFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBoardFileRepository extends JpaRepository<UserBoardFile, Long>
{
    void deleteByUserBoardId(long userBoardId);
}
