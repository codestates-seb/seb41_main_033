package mainproject33.domain.member.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.member.entity.*;
import mainproject33.domain.member.repository.*;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import mainproject33.global.security.redis.RedisDao;
import mainproject33.global.security.utils.CustomAuthorityUtils;
import mainproject33.global.service.VerificationService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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

    private final VerificationService verify;

    private final RedisDao redisDao;


    public Member createMember(Member member) {
        verify.existIdentifier(member.getIdentifier());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> role = customAuthorityUtils.createRoles(member.getIdentifier());
        member.setRoles(role);

        Profile profile = createProfile();
        member.setProfile(profile);

        return memberRepository.save(member);
    }

    public void deleteMember(Long memberId, Member user) {

        Member member = findMember(memberId);
        verify.userIsMember(member.getId(), user.getId());


        List<Follow> followList = followRepository.findByAllFollowList(member.getId());
        List<MemberLikes> likeList = memberLikesRepository.findByAllMemberLikeList(member.getId());
        List<Block> blockList = blockRepository.findByAllBlockList(member.getId());

        deleteData(followList, followRepository);
        deleteData(likeList, memberLikesRepository);
        deleteData(blockList, blockRepository);

        memberRepository.delete(member);
    }

    public Member updateProfile(Long memberId, Member patch, Member user, MultipartFile file) {

        Member findMember = findMember(memberId);
        verify.userIsMember(findMember.getId(), user.getId());

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

    public boolean follow(Long memberId, Member user) {
        verify.userSelfFollows(user.getId(), memberId);

        Member follower = findMember(user.getId()); // 팔로우를 하는 사람
        Member followed = findMember(memberId); // 팔로우를 받는 사람

        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setFollowed(followed);

        Optional<Follow> optionalFollow = followRepository.findByFollow(follower.getId(), followed.getId());
        Optional<Block> optionalBlock = blockRepository.findByBlock(follower.getId(), followed.getId());

        if(optionalBlock.isPresent()) {
            throw new BusinessLogicException(ExceptionMessage.CAN_NOT_FOLLOW_BLOCK_EXISTS);
        }

        if (optionalFollow.isEmpty()) {
            followRepository.save(follow);
            return true;
        } else {
            followRepository.delete(optionalFollow.get());
            return false;
        }
    }

    public boolean like(Long memberId, Member user) {
        verify.userSelfLikes(user.getId(), memberId);

        Member liker = findMember(user.getId());
        Member liked = findMember(memberId);

        MemberLikes likes = new MemberLikes();
        likes.setLiker(liker);
        likes.setLiked(liked);

        Optional<MemberLikes> optionalLikes = memberLikesRepository.findByMemberLikes(liker.getId(), liked.getId());
        Optional<Block> optionalBlock = blockRepository.findByBlock(liker.getId(), liked.getId());

        if(optionalBlock.isPresent()) {
            throw new BusinessLogicException(ExceptionMessage.CAN_NOT_LIKE_BLOCK_EXISTS);
        }

        if (optionalLikes.isEmpty()) {
            memberLikesRepository.save(likes);
            return true;
        } else {
            memberLikesRepository.delete(optionalLikes.get());
            return false;
        }
    }

    public boolean block(Long memberId, Member user) {
        verify.userSelfBlocks(user.getId(), memberId);

        Member blocker = findMember(user.getId());
        Member blocked = findMember(memberId);

        Block block = new Block();
        block.setBlocker(blocker);
        block.setBlocked(blocked);

        Optional<Block> optionalBlock = blockRepository.findByBlock(blocker.getId(), blocked.getId());
        Optional<Follow> optionalFollow = followRepository.findByFollow(blocker.getId(), blocked.getId());
        Optional<MemberLikes> optionalLike = memberLikesRepository.findByMemberLikes(blocker.getId(), blocked.getId());

        if(optionalBlock.isEmpty()) {
            blockRepository.save(block);

            optionalFollow.ifPresent(followRepository::delete);
            optionalLike.ifPresent(memberLikesRepository::delete);

            return true;

        } else {
            blockRepository.delete(optionalBlock.get());
            return false;
        }

    }

    @Transactional(readOnly = true)
    public List<Block> findBlockList(Long memberId, Member user) {

        verify.userIsMember(memberId, user.getId());

        return blockRepository.findByBlockList(memberId);
    }

    @Transactional(readOnly = true)
    public Member findMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionMessage.MEMBER_NOT_FOUND));

        return findMember;
    }

    private Profile createProfile() {

        Profile profile = new Profile();
        imageService.createDefaultProfileImage(profile);
        profile.setIntroduction("소개문을 작성해주세요");

        return profileRepository.save(profile);
    }

    private <T> void deleteData(List<T> list, JpaRepository repository) {
        if(!list.isEmpty()) {
            for(T data : list) {
                repository.delete(data);
            }
        }
    }
}
