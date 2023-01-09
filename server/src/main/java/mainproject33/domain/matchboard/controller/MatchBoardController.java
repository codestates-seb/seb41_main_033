package mainproject33.domain.matchboard.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.matchboard.dto.MatchBoardDto;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.matchboard.mapper.MatchBoardMapper;
import mainproject33.domain.matchboard.service.MatchBoardService;
import mainproject33.global.dto.MultiResponseDto;
import mainproject33.global.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
@Validated
public class MatchBoardController {
    // TODO : member entity 연계 시, memberId, memberNickname 정상적으로 받아올 수 있어야 함

    private final MatchBoardService matchBoardService;
    private final MatchBoardMapper mapper;

    @PostMapping
    public ResponseEntity postMatchBoard(@RequestBody MatchBoardDto.Post post) {
        MatchBoard matchBoard = matchBoardService.createMatchBoard(mapper.postMatchBoardToMatchBoard(post));

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.matchBoardToMatchBoardResponse(matchBoard)), HttpStatus.CREATED);
    }

    @PatchMapping("/{match-id}")
    public ResponseEntity patchMatchBoard(@PathVariable("match-id") @Positive Long id,
                                          @RequestBody MatchBoardDto.Patch patch) {
        patch.setId(id);
        MatchBoard matchBoard = matchBoardService.updateMatchBoard(mapper.patchMatchBoardToMatchBoard(patch));

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.matchBoardToMatchBoardResponse(matchBoard)), HttpStatus.OK);
    }

    @GetMapping("/{match-id}")
    public ResponseEntity getMatchBoard(@PathVariable("match-id") @Positive Long id) {
        MatchBoard matchBoard = matchBoardService.readMatchBoard(id);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.matchBoardToMatchBoardResponse(matchBoard)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMatchBoards(@RequestParam(value = "keyword", required = false) String keyword,
                                         @PageableDefault Pageable pageable) {
        Page<MatchBoard> matchBoardPage = matchBoardService.readMatchBoards(keyword, pageable.previousOrFirst());
        List<MatchBoard> matchBoards = matchBoardPage.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(
                        mapper.matchBoardsToMatchBoardResponses(matchBoards), matchBoardPage),
                HttpStatus.OK);
    }

    @DeleteMapping("/{match-id}")
    public ResponseEntity deleteMatchBoard(@PathVariable("match-id") @Positive Long id) {
        matchBoardService.deleteMatchBoard(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
