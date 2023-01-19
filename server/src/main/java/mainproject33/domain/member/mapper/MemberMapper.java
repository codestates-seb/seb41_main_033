package mainproject33.domain.member.mapper;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.gamedb.entity.GameDB;
import mainproject33.domain.gamedb.repository.GameDBRepository;
import mainproject33.domain.member.dto.MemberDto;
import mainproject33.domain.member.entity.*;
import mainproject33.domain.member.repository.BlockRepository;
import mainproject33.domain.member.repository.FollowRepository;
import mainproject33.domain.member.repository.MemberLikesRepository;
import mainproject33.domain.member.repository.MemberRepository;
import mainproject33.domain.member.service.ProfileImageService;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberMapper {

    private final MemberRepository memberRepository;
    private final GameDBRepository gameDBRepository;
    private final ProfileImageService imageService;
    private final FollowRepository followRepository;
    private final MemberLikesRepository memberLikesRepository;
    private final BlockRepository blockRepository;

    public Member postToMember(MemberDto.Post post) {

        if(post == null) return null;

        Member member = new Member();

        member.setIdentifier(post.getIdentifier());
        member.setPassword(post.getPassword());
        member.setNickname(post.getNickname());

        return member;
    }

    public Member patchToProfile(MemberDto.Patch patch) {

        if(patch == null) return null;

        Member member = new Member();

        member.setNickname(patch.getNickname());

        Profile profile = new Profile();
        profile.setIntroduction(patch.getIntroduction());
        profile.setGames(patch.getGames());

        member.setProfile(profile);

        return member;
    }

    public MemberDto.Response memberToResponse(Member member) {

        if(member == null) return null;

        MemberDto.Response response = new MemberDto.Response();

        response.setId(member.getId());
        response.setIdentifier(member.getIdentifier());
        response.setPassword(member.getPassword());
        response.setNickname(member.getNickname());
        response.setCreatedAt(member.getCreatedAt());
        response.setModifiedAt(member.getModifiedAt());

        return response;
    }

    public MemberDto.ProfileResponse ProfileToResponse(Member member, Member user) {

        if(member == null) return null;

        MemberDto.ProfileResponse profileResponse = new MemberDto.ProfileResponse();

        // 기본 정보
        profileResponse.setId(member.getProfile().getId());
        profileResponse.setIdentifier(member.getIdentifier());
        profileResponse.setNickname(member.getNickname());

        // 프로필 기본 정보
        profileResponse.setProfileImage(imageService.readProfileImagePath(member.getId())); // 이미지 url 반환

        profileResponse.setIntroduction(member.getProfile().getIntroduction());

        List<GameDB> games = new ArrayList<>();
        for(String game : member.getProfile().getGames()) {
            games.add(gameDBRepository.findByKorTitle(game));
        }
        profileResponse.setGames(games);

        // 팔로우 및 좋아요 수
        profileResponse.setFollowerCount(member.getProfile().getFollowerCount());
        profileResponse.setFollowingCount(member.getProfile().getFollowingCount());
        profileResponse.setLikeCount(member.getProfile().getLikeCount());

        // 팔로우, 좋아요, 차단 상태
        if (user != null) {
            profileResponse.setFollowStatus(verifyFollow(user.getId(), member.getId()));
            profileResponse.setLikeStatus(verifyLike(user.getId(), member.getId()));
            profileResponse.setBlockStatus(verifyBlock(user.getId(), member.getId()));
        } else {
            profileResponse.setFollowStatus(false);
            profileResponse.setLikeStatus(false);
            profileResponse.setBlockStatus(false);
        }

        profileResponse.setCreatedAt(member.getProfile().getCreatedAt());
        profileResponse.setModifiedAt(member.getProfile().getModifiedAt());

        return profileResponse;
    }

    public MemberDto.BlockedMember blockToBlockedMember(Block block) {

        if(block == null) return null;

        MemberDto.BlockedMember memberInformation = new MemberDto.BlockedMember();

        Optional<Member> blockedMember = memberRepository.findById(block.getBlocked().getId());

        if(blockedMember.isEmpty()) {
            throw new BusinessLogicException(ExceptionMessage.MEMBER_NOT_FOUND);
        } else {
            Member member = blockedMember.get();

            memberInformation.setId(member.getId());
            memberInformation.setIdentifier(member.getIdentifier());
            memberInformation.setNickname(member.getNickname());
            memberInformation.setProfileImage(imageService.readProfileImagePath(member.getId()));

            return memberInformation;
        }
    }

    public List<MemberDto.BlockedMember> blockListToMemberList(List<Block> blockList) {

        if(blockList == null) return null;

        List<MemberDto.BlockedMember> blockedInfoList = new ArrayList<>(blockList.size());

        for (Block block : blockList) {
            blockedInfoList.add(blockToBlockedMember(block));
        }

        return blockedInfoList;
    }

    public boolean verifyFollow(Long userId, Long memberId) {
        Optional<Follow> checkFollow = followRepository.findByFollow(userId, memberId);

        if (checkFollow.isPresent()) return true;
        return false;
    }

    public boolean verifyLike(Long userId, Long memberId) {
        Optional<MemberLikes> checkLike = memberLikesRepository.findByMemberLikes(userId, memberId);

        if (checkLike.isPresent()) return true;
        return false;
    }

    public boolean verifyBlock(Long userId, Long memberId) {
        Optional<Block> checkBlock = blockRepository.findByBlock(userId, memberId);

        if (checkBlock.isPresent()) return true;
        return false;
    }
}
