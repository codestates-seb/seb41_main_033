package mainproject33.domain.member.mapper;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.gamedb.entity.GameDB;
import mainproject33.domain.gamedb.repository.GameDBRepository;
import mainproject33.domain.matchboard.dto.MatchBoardDto;
import mainproject33.domain.matchboard.mapper.MatchBoardMapper;
import mainproject33.domain.member.dto.MemberDto;
import mainproject33.domain.member.entity.Follow;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.entity.MemberLikes;
import mainproject33.domain.member.entity.Profile;
import mainproject33.domain.member.repository.FollowRepository;
import mainproject33.domain.member.repository.MemberLikesRepository;
import mainproject33.domain.userboard.dto.UserBoardResponseDto;
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

    public MemberDto.ProfileResponse ProfileToResponse(Member member, String token) {

        if(member == null) return null;

        MemberDto.ProfileResponse profileResponse = new MemberDto.ProfileResponse();

        Long watchingMemberId = jwtTokenizer.tokenToMemberId(token);

        List<GameDB> games = new ArrayList<>();
        for(int i=0; i<member.getProfile().getGames().size(); i++) {
            games.add(gameDBRepository.findByKorTitle(member.getProfile().getGames().get(i)));
        }

        List<MatchBoardDto.Response> matchBoards =
                matchBoardMapper.matchBoardsToMatchBoardResponses(member.getMatchBoards());

        List<UserBoardResponseDto> userBoards =
                userBoardMapper.userBoardToResponses(member.getUserBoards());

        profileResponse.setId(member.getProfile().getId());
        profileResponse.setIdentifier(member.getIdentifier());
        profileResponse.setNickname(member.getNickname());
        profileResponse.setImage(member.getProfile().getImage());
        profileResponse.setFollower(member.getProfile().getFollower());
        profileResponse.setFollowing(member.getProfile().getFollowing());
        profileResponse.setFollowInfo(verifyFollow(member.getId(), watchingMemberId));
        profileResponse.setLikes(member.getProfile().getLikes());
        profileResponse.setLikesInfo(verifyLike(member.getId(), watchingMemberId));
        profileResponse.setBlock(member.getProfile().isBlock());
        profileResponse.setIntroduction(member.getProfile().getIntroduction());
        profileResponse.setGames(games);
        profileResponse.setMatchBoards(matchBoards);
        profileResponse.setUserBoards(userBoards);
        profileResponse.setCreatedAt(member.getProfile().getCreatedAt());
        profileResponse.setModifiedAt(member.getProfile().getModifiedAt());

        return profileResponse;
    }

    public boolean verifyFollow(Long memberId, Long watchingMemberId) {

        Optional<Follow> checkFollow = followRepository.findByFollow(memberId, watchingMemberId);

        if(checkFollow.isPresent()) {
            return true;
        }

        return false;
    }

    public boolean verifyLike(Long memberId, Long watchingMemberId) {

        Optional<MemberLikes> checkLike = memberLikesRepository.findByMemberLikes(memberId, watchingMemberId);

        if(checkLike.isPresent()) {
            return true;
        }

        return false;
    }

}
