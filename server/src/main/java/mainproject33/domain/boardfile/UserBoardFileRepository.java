package mainproject33.domain.boardfile;

import mainproject33.domain.boardfile.UserBoardFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBoardFileRepository extends JpaRepository<UserBoardFile, Long>
{
}
