package mainproject33.domain.userboard.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.service.MemberService;
import mainproject33.domain.userboard.dto.UserBoardPatchDto;
import mainproject33.domain.userboard.dto.UserBoardPostDto;
import mainproject33.domain.userboard.dto.UserBoardResponseDto;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.userboard.mapper.UserBoardMapper;
import mainproject33.domain.userboard.service.UserBoardService;
import mainproject33.global.dto.MultiResponseDto;
import mainproject33.global.dto.SingleResponseDto;
import mainproject33.global.dto.SliceDto;
import mainproject33.global.service.VerificationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/boards")
public class UserBoardController
{
    private final UserBoardService boardService;
    private final MemberService memberService;
    private final UserBoardMapper mapper;
    private final VerificationService verify;

    @PostMapping
    public ResponseEntity postBoard(@Valid @RequestPart(value = "data") UserBoardPostDto postDto,
                                    @RequestPart(value = "file", required = false) MultipartFile file,
                                    @AuthenticationPrincipal Member user) throws IOException
    {
        Member findMember = memberService.findMember(user.getId());

        UserBoard userBoard = boardService.postUserBoard(mapper.postToUserBoard(postDto), findMember, file);

        UserBoardResponseDto response = mapper.userBoardToResponse(userBoard, user);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@PathVariable("board-id") @Positive long boardId,
                                     @Valid @RequestBody UserBoardPatchDto patchDto,
                                     @AuthenticationPrincipal Member user)
    {
        verify.userIsUserBoardWriter(user, boardId);

        patchDto.setId(boardId);

        UserBoard userBoard = boardService.patchUserBoard(mapper.patchToUserBoard(patchDto));

        UserBoardResponseDto response = mapper.userBoardToResponse(userBoard, user);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId,
                                   @AuthenticationPrincipal Member user)
    {
        UserBoard userBoard = boardService.getUserBoard(boardId, user);

        UserBoardResponseDto response = mapper.userBoardToResponse(userBoard, user);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getBoards(@RequestParam(value = "keyword", required = false) String keyword,
                                    @PageableDefault(size = 8, sort = "id", direction = Sort.Direction.DESC)
                                    Pageable pageable,
                                    @AuthenticationPrincipal Member user)
    {
        Page<UserBoard> pageBoards = boardService.findAllBoards(keyword, pageable.previousOrFirst(), user);

        List<UserBoard> boards = pageBoards.getContent();
        List<UserBoardResponseDto> responses = mapper.userBoardToResponses(boards, user);

        return new ResponseEntity(new MultiResponseDto<>(responses, pageBoards), HttpStatus.OK);
    }

    //query dsl api. 테스트 용
    @GetMapping("/query")
    public ResponseEntity getBoardsQuery(@RequestParam(value = "keyword", required = false) String keyword,
                                         @PageableDefault(size = 8) Pageable pageable,
                                         @RequestParam(required = false) Long last,
                                         @AuthenticationPrincipal Member user)
    {
        Slice<UserBoard> sliceBoards = boardService.findAllBoardsQuerydsl(user, pageable, keyword, last);

        List<UserBoard> boards = sliceBoards.getContent();
        List<UserBoardResponseDto> responses = mapper.userBoardToResponses(boards, user);

        return new ResponseEntity(new SliceDto<>(responses, sliceBoards), HttpStatus.OK);
    }

    @GetMapping("/following")
    public ResponseEntity getFollowerBoards(@RequestParam(value = "keyword", required = false) String keyword,
                                            @PageableDefault(size = 8, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
                                            @AuthenticationPrincipal Member member)
    {
        Page<UserBoard> pageBoards = boardService.findFollowingBoards(keyword, pageable.previousOrFirst(), member);

        List<UserBoard> boards = pageBoards.getContent();
        List<UserBoardResponseDto> responses = mapper.userBoardToResponses(boards, member);

        return new ResponseEntity(new MultiResponseDto<>(responses, pageBoards), HttpStatus.OK);
    }


    @GetMapping("/following/query")
    public ResponseEntity getFollowerBoardsQuery(@RequestParam(value = "keyword", required = false) String keyword,
                                                 @PageableDefault(size = 8) Pageable pageable,
                                                 @RequestParam(required = false) Long last,
                                                 @AuthenticationPrincipal Member member)
    {
        Slice<UserBoard> sliceBoards = boardService.findFollowingBoardsQuerydsl(keyword, pageable, member, last);

        List<UserBoard> content = sliceBoards.getContent();

        List<UserBoardResponseDto> responses = mapper.userBoardToResponses(content, member);

        return new ResponseEntity(new SliceDto<>(responses, sliceBoards), HttpStatus.OK);
    }


    @DeleteMapping("{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive long boardId,
                                      @AuthenticationPrincipal Member user)
    {
        verify.userIsUserBoardWriter(user, boardId);

        boardService.deleteOne(boardId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}