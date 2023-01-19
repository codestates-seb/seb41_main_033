package mainproject33.domain.member.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.member.entity.*;
import mainproject33.domain.member.repository.*;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import mainproject33.global.security.redis.RedisDao;
import mainproject33.global.security.utils.CustomAuthorityUtils;
import org.springframework.data.domain.Page;
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
    private final MemberLikesRepository memberLikesRepository;

    private final BlockRepository blockRepository;
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

    public void deleteMember(Long memberId, Member user) {

        Member member = findVerifiedMember(memberId);
        verifyMember(member.getId(), user.getId());

        memberRepository.delete(member);
    }

    public Member updateProfile(Long memberId, Member patch, Member user, MultipartFile file) {

        Member findMember = findVerifiedMember(memberId);
        verifyMember(findMember.getId(), user.getId());

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

    public boolean follow(Long memberId, Member user) {
        verifyFollow(user.getId(), memberId);

        Member follower = findVerifiedMember(user.getId()); // 팔로우를 하는 사람
        Member followed = findVerifiedMember(memberId); // 팔로우를 받는 사람

        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setFollowed(followed);

        Optional<Follow> optionalFollow = followRepository.findByFollow(user.getId(), memberId);

        if (optionalFollow.isEmpty()) {
            follower.getProfile().addFollowingCount(1);
            followed.getProfile().addFollowerCount(1);
            followRepository.save(follow);
            return true;
        } else {
            follower.getProfile().addFollowingCount(-1);
            followed.getProfile().addFollowerCount(-1);
            followRepository.delete(optionalFollow.get());
            return false;
        }
    }

    public boolean like(Long memberId, Member user) {
        verifyLike(user.getId(), memberId);

        Member liker = findVerifiedMember(user.getId());
        Member liked = findVerifiedMember(memberId);

        MemberLikes likes = new MemberLikes();
        likes.setLiker(liker);
        likes.setLiked(liked);

        Optional<MemberLikes> optionalLikes =
                memberLikesRepository.findByMemberLikes(user.getId(), memberId);

        if (optionalLikes.isEmpty()) {
            liked.getProfile().addLikeCount(1);
            memberLikesRepository.save(likes);
            return true;
        } else {
            liked.getProfile().addLikeCount(-1);
            memberLikesRepository.delete(optionalLikes.get());
            return false;
        }
    }

    public boolean block(Long memberId, Member user) {
        verifyBlock(user.getId(), memberId);

        Member blocker = findVerifiedMember(user.getId());
        Member blocked = findVerifiedMember(memberId);

        Block block = new Block();
        block.setBlocker(blocker);
        block.setBlocked(blocked);

        Optional<Block> optionalBlock =
                blockRepository.findByBlock(user.getId(), memberId);

        if(optionalBlock.isEmpty()) {
            blockRepository.save(block);
            return true;
        } else {
            blockRepository.delete(optionalBlock.get());
            return false;
        }

    }

    public List<Block> findBlockList(Long memberId, Member user) {

        verifyMember(memberId, user.getId());

        return blockRepository.findByBlockList(memberId);
    }

    public void verifyMember(Long memberId, Long userId) {

        if(!Objects.equals(memberId, userId)) {
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

    private void verifyFollow(Long followerId, Long followedId) {
        if (followerId == followedId) {
            throw new BusinessLogicException(ExceptionMessage.SELF_FOLLOW_NOT_ALLOWED);
        }
    }

    private void verifyLike(Long likerId, Long likedId) {
        if(likerId == likedId) {
            throw new BusinessLogicException(ExceptionMessage.SELF_LIKE_NOT_ALLOWED);
        }
    }

    private void verifyBlock(Long blockerId, Long blockedId) {
        if(blockerId == blockedId) {
            throw new BusinessLogicException(ExceptionMessage.SELF_BLOCK_NOT_ALLOWED);
        }
    }

    public Profile createProfile() {

        Profile profile = new Profile();
        imageService.createDefaultProfileImage(profile);
        profile.setFollowerCount(0);
        profile.setFollowingCount(0);
        profile.setLikeCount(0);
        profile.setIntroduction("소개문을 작성해주세요");

        return profileRepository.save(profile);
    }
}
