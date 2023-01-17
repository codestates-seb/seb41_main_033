package mainproject33.domain.matchboard.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.matchboard.repository.MatchBoardRepository;
import mainproject33.domain.member.entity.Member;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchBoardService {

    private final MatchBoardRepository matchBoardRepository;

    public MatchBoard createMatchBoard(MatchBoard matchBoard) {
        return matchBoardRepository.save(matchBoard);
    }

    public MatchBoard updateMatchBoard(Member member, MatchBoard matchBoard) {
        MatchBoard findMatchBoard = findVerifiedMatchBoard(matchBoard.getId());

        if (verifyMember(member, findMatchBoard)) {
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

    public MatchBoard readMatchBoard(long id) {
        MatchBoard findMatchBoard = matchBoardRepository.findById(id)
                .orElseThrow(()
                        -> new NoSuchElementException(ExceptionMessage.MATCH_BOARD_NOT_FOUND.get()));

        return findMatchBoard;
    }

    public Page<MatchBoard> readMatchBoards(String keyword, Pageable pageable) {
        if (keyword == null) {
            return matchBoardRepository.findAll(pageable);
        } else {
            return matchBoardRepository.findByKeyword(keyword, pageable);
        }
    }

    public void deleteMatchBoard(Member member, long id) {
        MatchBoard findMatchBoard = findVerifiedMatchBoard(id);

        if (verifyMember(member, findMatchBoard)) {
            matchBoardRepository.delete(findMatchBoard);
        } else {
            throw new BusinessLogicException(ExceptionMessage.MEMBER_UNAUTHORIZED);
        }
    }

    public boolean verifyMember(Member principal, MatchBoard matchBoard) {
        return matchBoard.getMember().getId() == principal.getId();
    }

    private MatchBoard findVerifiedMatchBoard(long id) {
        return matchBoardRepository.findById(id).orElseThrow(() ->
                new BusinessLogicException(ExceptionMessage.MATCH_BOARD_NOT_FOUND));
    }
}
