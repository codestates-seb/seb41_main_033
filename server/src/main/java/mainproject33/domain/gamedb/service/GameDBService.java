package mainproject33.domain.gamedb.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.gamedb.entity.GameDB;
import mainproject33.domain.gamedb.repository.GameDBRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameDBService {
    private final GameDBRepository gameDBRepository;

    public List<GameDB> readGameDb() { // TODO : 페이지네이션 필요?
        return gameDBRepository.findAll();
    }
}