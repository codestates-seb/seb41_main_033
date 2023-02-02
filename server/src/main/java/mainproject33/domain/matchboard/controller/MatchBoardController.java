package mainproject33.domain.matchboard.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.matchboard.dto.MatchBoardDto;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.matchboard.mapper.MatchBoardMapper;
import mainproject33.domain.matchboard.service.MatchBoardService;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.service.MemberService;
import mainproject33.global.dto.MultiResponseDto;
import mainproject33.global.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
@Validated
public class MatchBoardController {
    private final MatchBoardService matchBoardService;
    private final MemberService memberService;
    private final MatchBoardMapper mapper;

    @PostMapping
    public ResponseEntity postMatchBoard(@RequestBody @Valid MatchBoardDto.Post post,
                                         @AuthenticationPrincipal Member user) {

        Member findMember = memberService.findMember(user.getId());

        MatchBoard matchBoard = matchBoardService.createMatchBoard(mapper.postMatchBoardToMatchBoard(post, findMember));

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.matchBoardToMatchBoardResponse(matchBoard)), HttpStatus.CREATED);
    }

    @PatchMapping("/{match-id}")
    public ResponseEntity patchMatchBoard(@PathVariable("match-id") @Positive(message = "id 값은 0보다 커야합니다.") Long id,
                                          @RequestBody @Valid MatchBoardDto.Patch patch,
                                          @AuthenticationPrincipal Member user) {
        patch.setId(id);
        MatchBoard matchBoard = matchBoardService.updateMatchBoard(user, mapper.patchMatchBoardToMatchBoard(patch));

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.matchBoardToMatchBoardResponse(matchBoard)), HttpStatus.OK);
    }

    @GetMapping("/{match-id}")
    public ResponseEntity getMatchBoard(@PathVariable("match-id")
                                        @Positive(message = "id 값은 0보다 커야합니다.") Long id,
                                        @AuthenticationPrincipal Member user) {
        MatchBoard matchBoard = matchBoardService.readMatchBoard(id, user);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.matchBoardToMatchBoardResponse(matchBoard)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMatchBoards(@RequestParam(value = "keyword", required = false) String keyword,
                                         @PageableDefault(size = 8) Pageable pageable,
                                         @AuthenticationPrincipal Member user) {
        Page<MatchBoard> matchBoardPage = matchBoardService.readMatchBoards(keyword, pageable.previousOrFirst(), user);
        List<MatchBoard> matchBoards = matchBoardPage.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(
                        mapper.matchBoardsToMatchBoardResponses(matchBoards), matchBoardPage),
                HttpStatus.OK);
    }

    @DeleteMapping("/{match-id}")
    public ResponseEntity deleteMatchBoard(@PathVariable("match-id")
                                           @Positive(message = "id 값은 0보다 커야합니다.") Long id,
                                           @AuthenticationPrincipal Member user) {
        matchBoardService.deleteMatchBoard(user, id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
