package mainproject33.domain.member.mapper;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.gamedb.entity.GameDB;
import mainproject33.domain.gamedb.repository.GameDBRepository;
import mainproject33.domain.matchboard.mapper.MatchBoardMapper;
import mainproject33.domain.member.dto.MemberDto;
import mainproject33.domain.member.entity.Follow;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.entity.MemberLikes;
import mainproject33.domain.member.entity.Profile;
import mainproject33.domain.member.repository.FollowRepository;
import mainproject33.domain.member.repository.MemberLikesRepository;
import mainproject33.domain.member.service.ProfileImageService;
import mainproject33.domain.userboard.mapper.UserBoardMapper;
import mainproject33.global.security.jwt.JwtTokenizer;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberMapper {

    private final GameDBRepository gameDBRepository;
    private final ProfileImageService imageService;
    private final FollowRepository followRepository;
    private final MemberLikesRepository memberLikesRepository;
    private final MatchBoardMapper matchBoardMapper;
    private final UserBoardMapper userBoardMapper;
    private final JwtTokenizer jwtTokenizer;

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
        profileResponse.setImage(imageService.readProfileImagePath(member.getId())); // 이미지 url 반환

        profileResponse.setIntroduction(member.getProfile().getIntroduction());

        List<GameDB> games = new ArrayList<>();
        for(String game : member.getProfile().getGames()) {
            games.add(gameDBRepository.findByKorTitle(game));
        }
        profileResponse.setGames(games);

        profileResponse.setMatchBoards(
                matchBoardMapper.matchBoardsToMatchBoardResponses(member.getMatchBoards()));

        profileResponse.setUserBoards(
                userBoardMapper.userBoardToResponses(member.getUserBoards()));

        // 차단
        profileResponse.setBlock(member.getProfile().isBlock());

        // 팔로우 및 좋아요 수
        profileResponse.setFollower(member.getProfile().getFollowerCount());
        profileResponse.setFollowing(member.getProfile().getFollowingCount());
        profileResponse.setLikes(member.getProfile().getLikeCount());

        // 팔로우 및 좋아요 상태
        if (user != null) {
            profileResponse.setFollowStatus(verifyFollow(user.getId(), member.getId()));
            profileResponse.setLikeStatus(verifyLike(user.getId(), member.getId()));
        } else {
            profileResponse.setFollowStatus(false);
            profileResponse.setLikeStatus(false);
        }

        profileResponse.setCreatedAt(member.getProfile().getCreatedAt());
        profileResponse.setModifiedAt(member.getProfile().getModifiedAt());

        return profileResponse;
    }

    public boolean verifyFollow(Long memberId, Long userId) {
        Optional<Follow> checkFollow = followRepository.findByFollow(memberId, userId);

        if (checkFollow.isPresent()) return true;

        return false;
    }

    public boolean verifyLike(Long memberId, Long userId) {
        Optional<MemberLikes> checkLike = memberLikesRepository.findByMemberLikes(memberId, userId);

        if (checkLike.isPresent()) return true;

        return false;
    }
}
