package mainproject33.domain.member.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.like.entity.Like;
import mainproject33.domain.member.dto.MemberDto;
import mainproject33.domain.member.entity.Follow;
import mainproject33.domain.member.entity.Likes;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.mapper.MemberMapper;
import mainproject33.domain.member.service.MemberService;
import mainproject33.global.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody @Valid MemberDto.Post post) {

        Member member = memberService.createMember(mapper.postToMember(post));
        MemberDto.Response response = mapper.memberToResponse(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity dropOut(@PathVariable("member-id") @Positive Long memberId,
                                  @AuthenticationPrincipal Member principal) {

        memberService.deleteMember(memberId, principal);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchProfile(@PathVariable("member-id") @Positive Long memberId,
                                       @RequestPart(value = "data", required = false) @Valid MemberDto.Patch patch,
                                       @RequestPart(value = "image", required = false) MultipartFile file,
                                       @AuthenticationPrincipal Member principal) {

        Member member = memberService.updateProfile(memberId, mapper.patchToProfile(patch), principal, file);
        MemberDto.ProfileResponse response = mapper.ProfileToResponse(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getProfile(@PathVariable("member-id") @Positive Long memberId) {

        Member member = memberService.findProfile(memberId);
        MemberDto.ProfileResponse response = mapper.ProfileToResponse(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PostMapping("/{member-id}/follows")
    public ResponseEntity follow(@PathVariable("member-id") @Positive Long memberId,
                                 @AuthenticationPrincipal Member principal) {

        Follow follow = memberService.follow(memberId, principal);

        if(follow == null) {
            return new ResponseEntity<>("팔로우가 취소되었습니다.", HttpStatus.OK);
        }

        return new ResponseEntity<>("팔로우가 완료되었습니다.", HttpStatus.OK);
    }

    @PostMapping("/{member-id}/likes")
    public ResponseEntity like(@PathVariable("member-id") @Positive Long memberId,
                               @AuthenticationPrincipal Member principal) {

        Likes likes = memberService.like(memberId, principal);

        if(likes == null) {
            return new ResponseEntity<>("좋아요가 취소되었습니다.", HttpStatus.OK);
        }

        return new ResponseEntity<>("좋아요가 완료되었습니다.", HttpStatus.OK);
    }

    @PostMapping("/{member-id}/blocks")
    public ResponseEntity block(@PathVariable("member-id") @Positive Long memberId,
                                @AuthenticationPrincipal Member principal) {

        return null;
    }

}
