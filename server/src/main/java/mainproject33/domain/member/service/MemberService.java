package mainproject33.domain.member.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.member.entity.Follow;
import mainproject33.domain.member.entity.MemberLikes;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.entity.Profile;
import mainproject33.domain.member.repository.FollowRepository;
import mainproject33.domain.member.repository.LikesRepository;
import mainproject33.domain.member.repository.MemberRepository;
import mainproject33.domain.member.repository.ProfileRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import mainproject33.global.security.redis.RedisDao;
import mainproject33.global.security.utils.CustomAuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;

    private final LikesRepository likesRepository;
    private final ProfileImageService imageService;
    private final FollowRepository followRepository;
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

    public Member updateProfile(Long memberId, Member patch, Member principal, MultipartFile file) {

        Member findMember = findVerifiedMember(memberId);
        verifyMember(findMember.getId(), principal);

        if (patch != null) {
            Optional.ofNullable(patch.getNickname())
                    .ifPresent(nickname -> findMember.setNickname(patch.getNickname()));
            Optional.ofNullable(patch.getProfile().getIntroduction())
                    .ifPresent(introduction -> findMember.getProfile().setIntroduction(introduction));
            Optional.ofNullable(patch.getProfile().getGames())
                    .ifPresent(games -> findMember.getProfile().setGames(games));
        }

        if (file != null) imageService.updateProfileImage(findMember.getProfile(), file);

        return memberRepository.save(findMember);
    }

    public Member findProfile(Long memberId) {

        return findVerifiedMember(memberId);
    }

    public Follow follow(Long memberId, Member principal) {

        Member follower = findVerifiedMember(memberId); // 팔로우를 받는 사람
        Member following = findVerifiedMember(principal.getId()); // 팔로우를 하는 사람

        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setFollowing(following);

        if(Objects.equals(follow.getFollower().getId(), follow.getFollowing().getId())) {
            throw new BusinessLogicException(ExceptionMessage.SELF_FOLLOW_NOT_ALLOWED);
        }

        Optional<Follow> verifyExistsFollow =
                followRepository.findByFollow(follow.getFollower().getId(), follow.getFollowing().getId());

        if(verifyExistsFollow.isPresent()) {
            followRepository.delete(verifyExistsFollow.get());
            return null;
        }

        return followRepository.save(follow);
    }

    public MemberLikes like(Long memberId, Member principal) {

        Member liker = findVerifiedMember(memberId);
        Member liking = findVerifiedMember(principal.getId());

        MemberLikes likes = new MemberLikes();
        likes.setLiker(liker);
        likes.setLiking(liking);

        if(Objects.equals(likes.getLiker().getId(), likes.getLiking().getId())) {
            throw new BusinessLogicException(ExceptionMessage.SELF_LIKE_NOT_ALLOWED);
        }

        Optional<MemberLikes> verifyExistsLikes =
                likesRepository.findByLikes(likes.getLiker().getId(), likes.getLiking().getId());

        if(verifyExistsLikes.isPresent()) {
            likesRepository.delete(verifyExistsLikes.get());
            return null;
        }

        return likesRepository.save(likes);
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
        imageService.createDefaultProfileImage(profile);
        profile.setFollower(0);
        profile.setFollowing(0);
        profile.setLikes(0);
        profile.setBlock(false);
        profile.setIntroduction("소개문을 작성해주세요");

        return profileRepository.save(profile);
    }
}
