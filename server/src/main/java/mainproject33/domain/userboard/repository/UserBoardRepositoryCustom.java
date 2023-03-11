package mainproject33.domain.userboard.repository;

import mainproject33.domain.member.entity.Member;
import mainproject33.domain.userboard.entity.UserBoard;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface UserBoardRepositoryCustom
{
    public Slice<UserBoard> findAllWithoutLogin(Pageable pageable, String keyword, Long lastBoard);

    public Slice<UserBoard> findAllFilteredBoard(Member user, Pageable pageable, String keyword, Long lastBoardId);

    public Slice<UserBoard> findFriendsUserBoards(Member user, Pageable pageable, String keyword, Long lastBoardId);

}
