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

    public List<GameDB> readGameDB(String keyword) {
        if (keyword == null) {
            return gameDBRepository.findAll();
        } else {
            keyword = keyword.replaceAll(" ", "").toLowerCase(); // 띄어쓰기, 대소문자 상관없이 검색할 수 있게
            return gameDBRepository.findByKeyword(keyword);
        }
    }

    public GameDB readRandomGameDB() {
        Random random = new Random();
        int randomInt = random.nextInt(gameDBRepository.findAll().size());
        while (randomInt == 0) { // 0이 걸리면 0이 안 걸릴 때 까지 랜덤 뽑기
            randomInt = random.nextInt(gameDBRepository.findAll().size());
        }

        return gameDBRepository.findById((long) randomInt)
                .orElseThrow(() -> new NoSuchElementException(ExceptionMessage.MATCH_BOARD_ID_NOT_FOUND.get()));
    }
}