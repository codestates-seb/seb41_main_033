package mainproject33.domain.gamedb.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.gamedb.entity.GameDB;
import mainproject33.domain.gamedb.service.GameDBService;
import mainproject33.global.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameDBController {

    private final GameDBService gameDBService;

    @GetMapping
    public ResponseEntity getGameDBs(@RequestParam(value = "keyword", required = false) String keyword) {
        List<GameDB> gameDBs = gameDBService.readGameDB(keyword);

        return new ResponseEntity(new SingleResponseDto<>(gameDBs), HttpStatus.OK);
    }

    @GetMapping("/random")
    public ResponseEntity getRandomGameDB() {
        GameDB game = gameDBService.readRandomGameDB();

        return new ResponseEntity(new SingleResponseDto<>(game), HttpStatus.OK);
    }
}
