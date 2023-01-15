package mainproject33.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.entity.Profile;
import mainproject33.domain.member.repository.MemberRepository;
import mainproject33.domain.member.repository.ProfileRepository;
import mainproject33.global.security.redis.RedisDao;
import mainproject33.global.security.utils.CustomAuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final ProfileImageService imageService;
    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;

    private final RedisDao redisDao;


    public Member createMember(Member member) {
        verifyExistsIdentifier(member.getIdentifier());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> role = customAuthorityUtils.createRoles(member.getIdentifier());
        member.setRoles(role);

        Profile profile = profileRepository.save(member.getProfile()); // 프로필 생성
        imageService.createDefaultProfileImage(profile); // 프로필 이미지 생성

        return memberRepository.save(member);
    }

    public void deleteMember(Long memberId) {
        Member member = findVerifiedMember(memberId);
        memberRepository.delete(member);
    }

    public Member updateProfile(Member member, Long memberId) {
        Member findMember = findVerifiedMember(memberId);
        Profile findProfile = findVerifiedProfile(memberId);

        Optional.ofNullable(member.getNickname()) // 회원 닉네임 수정
                .ifPresent(findMember::setNickname);

        Optional.ofNullable(member.getProfile().getBase64EncodedFile()) // 프로필 사진 수정
                .ifPresent(base64EncodedFile -> imageService.updateProfileImage(findProfile, base64EncodedFile)); // 새로운 프로필 이미지 파일 생성 및 DB 에 정보 저장

        Optional.ofNullable(member.getProfile().getIntroduction()) // 프로필 소개글 수정
                .ifPresent(introduction -> findProfile.setIntroduction(introduction));

        Optional.ofNullable(member.getProfile().getGames()) // 프로필 자주 하는 게임 수정
                .ifPresent(games -> findProfile.setGames(games));

        profileRepository.save(findProfile); // 프로필 정보 저장

        return memberRepository.save(findMember); // 회원 정보 저장
    }

    public Member findProfile(Long memberId) {
       return findVerifiedMember(memberId);
    }

    public Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        return findMember;
    }

    public Profile findVerifiedProfile(Long memberId) {
        Optional<Profile> optionalProfile = profileRepository.findById(memberId);
        Profile findProfile = optionalProfile.orElseThrow(() -> new RuntimeException("프로필을 찾을 수 없습니다."));

        return findProfile;
    }

    public void verifyExistsIdentifier(String identifier) {
        Optional<Member> member = memberRepository.findByIdentifier(identifier);
        if (member.isPresent())
            throw new RuntimeException("회원이 이미 존재합니다.");
    }
}
