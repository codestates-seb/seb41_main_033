package mainproject33.domain.member.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        return memberRepository.save(member);
    }

    public void deleteMember(Long memberId) {
        Member member = findVerifiedMember(memberId);
        memberRepository.delete(member);
    }

    public Member findMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());
        if(!optionalMember.isPresent() || !optionalMember.get().getPassword().equals(member.getPassword())){
            throw new RuntimeException("로그인 정보가 일치하지 않습니다.");
        }

        return optionalMember.get();
    }

    public Member updateProfile(Member member, Long memberId) {
        Member findMember = findVerifiedMember(memberId);

        Optional.of(member.getNickname())
                .ifPresent(findMember::setNickname);

        Optional.ofNullable(member.getImage())
                .ifPresent(image -> findMember.setImage(image));
        Optional.ofNullable(member.getIntroduction())
                .ifPresent(introduction -> findMember.setIntroduction(introduction));
        Optional.ofNullable(member.getGame())
                .ifPresent(game -> findMember.setGame(game));

        return memberRepository.save(findMember);
    }

    public Member findProfile(Long memberId) {
       return findVerifiedMember(memberId);
    }

    public Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        return findMember;
    }

    public void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isPresent())
            throw new RuntimeException("회원이 이미 존재합니다.");
    }
}