package mainproject33.domain.userboard.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.domain.userboard.dto.UserBoardPatchDto;
import mainproject33.domain.userboard.dto.UserBoardPostDto;
import mainproject33.domain.userboard.dto.UserBoardResponseDto;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.userboard.mapper.UserBoardMapper;
import mainproject33.domain.userboard.repository.UserBoardRepository;
import mainproject33.domain.userboard.service.UserBoardService;
import mainproject33.global.dto.MultiResponseDto;
import mainproject33.global.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/boards")
public class UserBoardController
{
    private final UserBoardService boardService;

    private final UserBoardMapper mapper;

    @PostMapping
    public ResponseEntity postBoard(@Valid @RequestBody UserBoardPostDto postDto)
    {
        UserBoard userBoard = boardService.postUserBoard(mapper.postToUserBoard(postDto));

        UserBoardResponseDto response = mapper.userBoardToResponse(userBoard);

        log.info("등록 완료");
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@PathVariable("board-id") @Positive long boardId,
                                     @Valid @RequestBody UserBoardPatchDto patchDto)
    {
        patchDto.setId(boardId);

        UserBoard userBoard = boardService.postUserBoard(mapper.patchToUserBoard(patchDto));

        UserBoardResponseDto response = mapper.userBoardToResponse(userBoard);

        log.info("수정 완료");
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId)
    {
        UserBoard userBoard = boardService.findOne(boardId);

        UserBoardResponseDto response = mapper.userBoardToResponse(userBoard);

        log.info("글 조회 완료 = {}", boardId);
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getBoards(@RequestParam @Positive int page,
                                    @RequestParam @Positive int size)
    {
        Page<UserBoard> pageBoards = boardService.findAll(page - 1, size);
        List<UserBoard> boards = pageBoards.getContent();
        List<UserBoardResponseDto> responses = mapper.userBoardToResponses(boards);

        log.info("글 전체 조회 완료");
        return new ResponseEntity(new MultiResponseDto<>(responses, pageBoards), HttpStatus.OK);
    }

    @DeleteMapping("{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive long boardId)
    {
        boardService.deleteOne(boardId);

        log.info("글 삭제 완료");
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}