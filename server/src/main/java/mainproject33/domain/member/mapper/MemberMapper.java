package mainproject33.domain.member.mapper;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.gamedb.entity.GameDB;
import mainproject33.domain.gamedb.repository.GameDBRepository;
import mainproject33.domain.matchboard.dto.MatchBoardDto;
import mainproject33.domain.matchboard.mapper.MatchBoardMapper;
import mainproject33.domain.member.dto.MemberDto;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.entity.Profile;
import mainproject33.domain.userboard.dto.UserBoardResponseDto;
import mainproject33.domain.userboard.mapper.UserBoardMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MemberMapper {

    private final GameDBRepository gameDBRepository;
    private final MatchBoardMapper matchBoardMapper;

    private final UserBoardMapper userBoardMapper;

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

        Profile profile = new Profile();
        member.setProfile(profile);

        member.setNickname(patch.getNickname());
        member.getProfile().setImage(patch.getImage());
        member.getProfile().setIntroduction(patch.getIntroduction());
        member.getProfile().setGames(patch.getGames());

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

    public MemberDto.ProfileResponse ProfileToResponse(Member member) {

        if(member == null) return null;

        MemberDto.ProfileResponse profileResponse = new MemberDto.ProfileResponse();

        profileResponse.setId(member.getProfile().getId());
        profileResponse.setNickname(member.getNickname());
        profileResponse.setImage(member.getProfile().getImage());
        profileResponse.setFollower(member.getProfile().getFollower());
        profileResponse.setFollowing(member.getProfile().getFollowing());
        profileResponse.setLikes(member.getProfile().getLikes());
        profileResponse.setBlock(member.getProfile().isBlock());

        List<GameDB> games = new ArrayList<>();

        for(int i=0; i<member.getProfile().getGames().size(); i++) {
            GameDB game = gameDBRepository.findByKorTitle(member.getProfile().getGames().get(i));
            games.add(game);
        }

        profileResponse.setGames(games);

        List<MatchBoardDto.Response> matchBoards =
                matchBoardMapper.matchBoardsToMatchBoardResponses(member.getMatchBoards());

        profileResponse.setMatchBoards(matchBoards);

        List<UserBoardResponseDto> userBoards =
                userBoardMapper.userBoardToResponses(member.getUserBoards());

        profileResponse.setUserBoards(userBoards);
        profileResponse.setCreatedAt(member.getProfile().getCreatedAt());
        profileResponse.setModifiedAt(member.getProfile().getModifiedAt());

        return profileResponse;
    }

}
