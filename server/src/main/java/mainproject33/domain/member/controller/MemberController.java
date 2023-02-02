package mainproject33.domain.member.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.matchboard.dto.MatchBoardDto;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.matchboard.mapper.MatchBoardMapper;
import mainproject33.domain.matchboard.service.MatchBoardService;
import mainproject33.domain.member.dto.BlockResponseDto;
import mainproject33.domain.member.dto.MemberDto;
import mainproject33.domain.member.entity.Block;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.mapper.MemberMapper;
import mainproject33.domain.member.service.MemberService;
import mainproject33.domain.userboard.dto.UserBoardResponseDto;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.userboard.mapper.UserBoardMapper;
import mainproject33.domain.userboard.service.UserBoardService;
import mainproject33.global.dto.MultiResponseDto;
import mainproject33.global.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    private final UserBoardService userBoardService;
    private final UserBoardMapper userBoardMapper;

    private final MatchBoardService matchBoardService;
    private final MatchBoardMapper matchBoardMapper;

    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody @Valid MemberDto.Post post) {

        Member member = memberService.createMember(memberMapper.postToMember(post));
        MemberDto.Response response = memberMapper.memberToResponse(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity dropOut(@PathVariable("member-id") @Positive Long memberId,
                                  @AuthenticationPrincipal Member user) {

        memberService.deleteMember(memberId, user);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchProfile(@PathVariable("member-id") @Positive Long memberId,
                                       @RequestPart(value = "data", required = false) @Valid MemberDto.Patch patch,
                                       @RequestPart(value = "image", required = false) MultipartFile file,
                                       @AuthenticationPrincipal Member user) {

        Member member = memberService.updateProfile(memberId, memberMapper.patchToProfile(patch), user, file);
        MemberDto.ProfileResponse response = memberMapper.ProfileToResponse(member, user);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getProfile(@PathVariable("member-id") @Positive Long memberId,
                                     @AuthenticationPrincipal Member user) {

        Member member = memberService.findMember(memberId);
        MemberDto.ProfileResponse response = memberMapper.ProfileToResponse(member, user);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PostMapping("/{member-id}/follows")
    public ResponseEntity follow(@PathVariable("member-id") @Positive Long memberId,
                                 @AuthenticationPrincipal Member user) {

        if(memberService.follow(memberId, user)) {
            return new ResponseEntity<>("팔로우가 완료되었습니다.", HttpStatus.OK);
        }

        return new ResponseEntity<>("팔로우가 취소되었습니다.", HttpStatus.OK);
    }

    @PostMapping("/{member-id}/likes")
    public ResponseEntity memberLike(@PathVariable("member-id") @Positive Long memberId,
                                     @AuthenticationPrincipal Member user) {

        if(memberService.like(memberId, user)) {
            return new ResponseEntity<>("좋아요가 완료되었습니다.", HttpStatus.OK);
        }

        return new ResponseEntity<>("좋아요가 취소되었습니다.", HttpStatus.OK);
    }

    @PostMapping("/{member-id}/blocks")
    public ResponseEntity block(@PathVariable("member-id") @Positive Long memberId,
                                @AuthenticationPrincipal Member user) {

        if(memberService.block(memberId, user)) {
            return new ResponseEntity<>("해당 유저를 차단하셨습니다. 팔로우와 좋아요도 취소됩니다.", HttpStatus.OK);
        }

        return new ResponseEntity<>("해당 유저 차단을 취소하셨습니다.", HttpStatus.OK);
    }

    @GetMapping("/{member-id}/boards")
    public ResponseEntity getUserBoards(@PathVariable("member-id") @Positive Long memberId,
                                        @PageableDefault(size = 8, sort = "id", direction = Sort.Direction.DESC)Pageable pageable,
                                        @AuthenticationPrincipal Member user) {

        Page<UserBoard> pageBoards = userBoardService.findProfileUserBoards(memberId, pageable.previousOrFirst());

        List<UserBoard> boards = pageBoards.getContent();
        List<UserBoardResponseDto> responses = userBoardMapper.userBoardToResponses(boards, user);

        return new ResponseEntity<>(
                new MultiResponseDto<>(responses, pageBoards), HttpStatus.OK);
    }
    @GetMapping("/{member-id}/matches")
    public ResponseEntity getMatchesBoards(@PathVariable("member-id") @Positive Long memberId,
                                           @PageableDefault(size = 8, sort = "id",
                                                   direction = Sort.Direction.DESC)Pageable pageable) {

        Page<MatchBoard> pageMatches = matchBoardService.readProfileMatchBoards(memberId, pageable.previousOrFirst());

        List<MatchBoard> matchBoards = pageMatches.getContent();
        List<MatchBoardDto.Response> responses = matchBoardMapper.matchBoardsToMatchBoardResponses(matchBoards);

        return new ResponseEntity<>(
                new MultiResponseDto<>(responses, pageMatches), HttpStatus.OK);
    }

    @GetMapping("/{member-id}/blocks")
    public ResponseEntity getBlockList(@PathVariable("member-id") @Positive Long memberId,
                                        @AuthenticationPrincipal Member user) {

        List<Block> blockedList = memberService.findBlockList(memberId, user);
        List<MemberDto.BlockedMember> blockedMemberList = memberMapper.blockListToMemberList(blockedList);

        return new ResponseEntity<>(
                new BlockResponseDto<>(blockedMemberList), HttpStatus.OK);
    }

}
