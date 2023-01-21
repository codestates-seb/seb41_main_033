package mainproject33.domain.matchboard.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.matchboard.repository.MatchBoardRepository;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.repository.BlockRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import mainproject33.global.service.VerificationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MatchBoardService {

    private final MatchBoardRepository matchBoardRepository;
    private final BlockRepository blockRepository;
    private final VerificationService verify;

    public MatchBoard createMatchBoard(MatchBoard matchBoard) {
        return matchBoardRepository.save(matchBoard);
    }

    public MatchBoard updateMatchBoard(Member user, MatchBoard matchBoard) {
        MatchBoard findMatchBoard = findMatchBoard(matchBoard.getId());

        if (verify.userIsMatchBoardWriter(user, findMatchBoard)) {
            Optional.ofNullable(matchBoard.getTitle())
                    .ifPresent(title -> findMatchBoard.setTitle(title));
            Optional.ofNullable(matchBoard.getContent())
                    .ifPresent(content -> findMatchBoard.setContent(content));
            Optional.ofNullable(matchBoard.getTags())
                    .ifPresent(tags -> findMatchBoard.setTags(tags));
            Optional.ofNullable(matchBoard.getGame())
                    .ifPresent(game -> findMatchBoard.setGame(game));
            if (matchBoard.getTeam() != 0) findMatchBoard.setTeam(matchBoard.getTeam());

            return matchBoardRepository.save(findMatchBoard);
        } else {
            throw new BusinessLogicException(ExceptionMessage.MEMBER_UNAUTHORIZED);
        }
    }

    public MatchBoard readMatchBoard(long id, Member user) {
        MatchBoard matchBoard = findMatchBoard(id);

        if (user == null) { // 비회원
            return matchBoard;
        } else { // 회원
            List<Long> blockedIdList = blockRepository.findBlockedIdByBlockerId(user.getId());

            boolean checkBlock = blockedIdList.contains(matchBoard.getMember().getId()); // 유저가 해당 게시물을 작성한 회원의 block 여부

            if (!checkBlock) return matchBoard;
            else throw new BusinessLogicException(ExceptionMessage.MATCH_BOARD_BLOCKED);
        }
    }

    public Page<MatchBoard> readMatchBoards(String keyword, Pageable pageable, Member user) {
        List<MatchBoard> list;

        if (user == null) { // 비회원
            if (keyword == null) list = matchBoardRepository.findAll();
            else list = matchBoardRepository.findByKeyword(keyword);
        } else { // 회원
            List<Long> blockedIdList = blockRepository.findBlockedIdByBlockerId(user.getId());

            if (keyword == null) list = filterMatchBoards(blockedIdList, matchBoardRepository.findAll());
            else list = filterMatchBoards(blockedIdList, matchBoardRepository.findByKeyword(keyword));
        }
        return toPageImpl(pageable, list);
    }

    public Page<MatchBoard> readProfileMatchBoards(Long memberId, Pageable pageable) {
        return matchBoardRepository.findByMemberId(memberId, pageable);
    }

    public void deleteMatchBoard(Member user, long id) {
        MatchBoard findMatchBoard = findMatchBoard(id);

        if (verify.userIsMatchBoardWriter(user, findMatchBoard)) {
            matchBoardRepository.delete(findMatchBoard);
        } else {
            throw new BusinessLogicException(ExceptionMessage.MEMBER_UNAUTHORIZED);
        }
    }

    private MatchBoard findMatchBoard(long id) {
        return matchBoardRepository.findById(id).orElseThrow(() ->
                new BusinessLogicException(ExceptionMessage.MATCH_BOARD_NOT_FOUND));
    }

    private List<MatchBoard> filterMatchBoards(List<Long> blockedIdList, List<MatchBoard> list) {
        return list.stream()
                .filter(matchBoard -> !blockedIdList.contains(matchBoard.getMember().getId()))
                .collect(Collectors.toList());
    }

    private PageImpl toPageImpl(Pageable pageable, List<MatchBoard> list) {
        final int start = (int) pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), list.size());

        return new PageImpl<>(list.subList(start, end), pageable, list.size());
    }
}
