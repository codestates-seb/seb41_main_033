package mainproject33.domain.member.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.member.dto.MemberDto;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.mapper.MemberMapper;
import mainproject33.domain.member.service.MemberService;
import mainproject33.global.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody MemberDto.Post post) {

        Member member = memberService.createMember(mapper.postToMember(post));
        MemberDto.Response response = mapper.memberToResponse(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity dropOut(@PathVariable("member-id") @Positive Long memberId) {

        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchProfile(@RequestBody MemberDto.Patch patch,
                                       @PathVariable("member-id") @Positive Long memberId) {
        Member member = memberService.updateProfile(mapper.patchToMember(patch), memberId);
        MemberDto.Response response = mapper.memberToResponse(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getProfile(@PathVariable("member-id") @Positive Long memberId) {
        Member member = memberService.findProfile(memberId);
        MemberDto.Response response = mapper.memberToResponse(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

}
