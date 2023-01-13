package mainproject33.domain.member.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.entity.Profile;
import mainproject33.domain.member.repository.MemberRepository;
import mainproject33.domain.member.repository.ProfileRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import mainproject33.global.security.redis.RedisDao;
import mainproject33.global.security.utils.CustomAuthorityUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

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

        Profile profile = createProfile();
        member.setProfile(profile);

        return memberRepository.save(member);
    }

    public void deleteMember(Long memberId, Member principal) {

        Member member = findVerifiedMember(memberId);
        verifyMember(member.getId(), principal);

        memberRepository.delete(member);
    }

    public void updateProfile(Long memberId, Member member, Member principal) {

        Member findMember = findVerifiedMember(memberId);
        verifyMember(findMember.getId(), principal);

        Optional.ofNullable(findMember.getNickname())
                .ifPresent(nickname -> findMember.setNickname(member.getNickname()));
        Optional.ofNullable(findMember.getProfile().getImage())
                .ifPresent(image -> findMember.getProfile().setImage(member.getProfile().getImage()));
        Optional.ofNullable(findMember.getProfile().getIntroduction())
                .ifPresent(introduction ->
                        findMember.getProfile().setIntroduction(member.getProfile().getIntroduction()));
        Optional.ofNullable(findMember.getProfile().getGames())
                .ifPresent(image -> findMember.getProfile().setGames(member.getProfile().getGames()));

        memberRepository.save(findMember);
    }

    public Member findProfile(Long memberId) {

        return findVerifiedMember(memberId);
    }

    public void verifyMember(Long memberId, Member principal) {

        if(!Objects.equals(memberId, principal.getId())) {
            throw new BusinessLogicException(ExceptionMessage.MEMBER_UNAUTHORIZED);
        }

    }

    public Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionMessage.MEMBER_NOT_FOUND));

        return findMember;
    }

    public void verifyExistsIdentifier(String identifier) {
        Optional<Member> member = memberRepository.findByIdentifier(identifier);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionMessage.MEMBER_EXISTS);
    }

    public Profile createProfile() {

        Profile profile = new Profile();
        profile.setImage("디폴트 이미지");
        profile.setFollower(0);
        profile.setFollowing(0);
        profile.setLike(0);
        profile.setBlock(false);

        return profileRepository.save(profile);
    }
}
