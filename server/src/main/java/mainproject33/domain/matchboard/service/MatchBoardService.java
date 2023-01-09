package mainproject33.domain.matchboard.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.matchboard.repository.MatchBoardRepository;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchBoardService {

    private final MatchBoardRepository matchBoardRepository;

    public MatchBoard createMatchBoard(MatchBoard matchBoard) {
        MatchBoard createdMatchBoard = new MatchBoard();
        createdMatchBoard.setTitle(matchBoard.getTitle());
        createdMatchBoard.setContent(matchBoard.getContent());

        return matchBoardRepository.save(createdMatchBoard);
    }

    public MatchBoard updateMatchBoard(MatchBoard matchBoard) {
        MatchBoard findMatchBoard = matchBoardRepository.findById(matchBoard.getId())
                .orElseThrow(()
                        -> new NoSuchElementException(ExceptionMessage.MATCH_BOARD_NOT_FOUND.get()));

        Optional.ofNullable(matchBoard.getTitle())
                .ifPresent(title -> findMatchBoard.setTitle(title));
        Optional.ofNullable(matchBoard.getContent())
                .ifPresent(content -> findMatchBoard.setContent(content));

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
}
