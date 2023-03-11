package mainproject33.domain.userboard.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.userboard.entity.UserBoard;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

import static mainproject33.domain.member.entity.QBlock.block;
import static mainproject33.domain.member.entity.QFollow.follow;
import static mainproject33.domain.userboard.entity.QUserBoard.userBoard;

@RequiredArgsConstructor
public class UserBoardRepositoryImpl implements UserBoardRepositoryCustom
{
    private final JPAQueryFactory query;

    @Override
    public Slice<UserBoard> findAllWithoutLogin(Pageable pageable, String keyword, Long lastBoard)
    {
        List<UserBoard> result = query
                .selectFrom(userBoard)
                .where(ltBoardId(lastBoard))
                .where(checkKeyword(keyword))
                .orderBy(userBoard.id.desc())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        Slice<UserBoard> userBoards = checkLastPage(pageable, result);

        return userBoards;
    }

    @Override
    public Slice<UserBoard> findAllFilteredBoard(Member user, Pageable pageable, String keyword, Long lastBoardId)
    {
        List<Long> myBlackList = query
                .select(block.Blocked.id)
                .from(block)
                .where(block.Blocker.id.eq(user.getId()))
                .fetch();

        List<Long> blockedList = query
                .select(block.Blocker.id)
                .from(block)
                .where(block.Blocked.id.eq(user.getId()))
                .fetch();


        List<UserBoard> result = query
                .select(userBoard)
                .from(userBoard, block)
                .where(ltBoardId(lastBoardId))
                .where(checkKeyword(keyword))
                .where(userBoard.member.id.notIn(blockedList))
                .where(userBoard.member.id.notIn(myBlackList))
                .distinct()
                .orderBy(userBoard.id.desc())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        Slice<UserBoard> userBoards = checkLastPage(pageable, result);

        return userBoards;
    }

    @Override
    public Slice<UserBoard> findFriendsUserBoards(Member user, Pageable pageable, String keyword, Long lastBoardId)
    {
        List<UserBoard> result = query
                .selectFrom(userBoard)
                .leftJoin(follow)
                .on(follow.followed.id.eq(userBoard.member.id))
                .where(ltBoardId(lastBoardId))
                .where(follow.follower.id.eq(user.getId()))
                .where(checkKeyword(keyword))
                .orderBy(userBoard.id.desc())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        Slice<UserBoard> userBoards = checkLastPage(pageable, result);

        return userBoards;
    }


    private BooleanExpression checkKeyword(String keyword)
    {
        return keyword != null ? userBoard.content.lower().contains(keyword.toLowerCase()) : null;
    }

    private BooleanExpression ltBoardId(Long boardId)
    {
        //lt = boardId 보다 작은지 검사
        return boardId != null ? userBoard.id.lt(boardId) : null;
    }

    private Slice<UserBoard> checkLastPage(Pageable pageable, List<UserBoard> boards)
    {
        boolean hasNext = false;
        if(boards.size() > pageable.getPageSize())
        {
            hasNext = true;
            boards.remove(pageable.getPageSize());
        }

        return new SliceImpl<>(boards, pageable, hasNext);
    }

}
