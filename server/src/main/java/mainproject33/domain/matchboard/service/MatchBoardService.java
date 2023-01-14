package mainproject33.domain.matchboard.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.matchboard.repository.MatchBoardRepository;
import mainproject33.domain.member.entity.Member;
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

    public MatchBoard updateMatchBoard(MatchBoard matchBoard) {
        MatchBoard findMatchBoard = matchBoardRepository.findById(matchBoard.getId())
                .orElseThrow(()
                        -> new NoSuchElementException(ExceptionMessage.MATCH_BOARD_NOT_FOUND.get()));

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

    public void deleteMatchBoard(long id) {
        MatchBoard findMatchBoard = matchBoardRepository.findById(id)
                .orElseThrow(()
                        -> new NoSuchElementException(ExceptionMessage.MATCH_BOARD_NOT_FOUND.get()));

        matchBoardRepository.delete(findMatchBoard);
    }

    public boolean checkMember(Member principal, long id) {
        Optional<MatchBoard> optionalMatchBoard = matchBoardRepository.findById(id);

        return optionalMatchBoard.isPresent() && (optionalMatchBoard.get().getMember().getId() == principal.getId());
    }
}
