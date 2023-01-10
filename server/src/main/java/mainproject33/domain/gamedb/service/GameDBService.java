package mainproject33.domain.gamedb.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.gamedb.entity.GameDB;
import mainproject33.domain.gamedb.repository.GameDBRepository;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GameDBService {
    private final GameDBRepository gameDBRepository;

    public List<GameDB> readGameDB(String keyword) { // TODO : 페이지네이션 필요?
        if (keyword == null) {
            return gameDBRepository.findAll();
        } else {
            return gameDBRepository.findByKeyword(keyword);
        }
    }

    public GameDB readRandomGameDB() {
        Random random = new Random();
        int randomInt = random.nextInt(gameDBRepository.findAll().size());

        return gameDBRepository.findById((long) randomInt)
                .orElseThrow(() -> new NoSuchElementException(ExceptionMessage.MATCH_BOARD_ID_NOT_FOUND.get()));
    }
}