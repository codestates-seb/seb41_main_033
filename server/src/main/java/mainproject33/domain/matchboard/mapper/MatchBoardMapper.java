package mainproject33.domain.matchboard.mapper;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.gamedb.entity.GameDB;
import mainproject33.domain.gamedb.repository.GameDBRepository;
import mainproject33.domain.matchboard.dto.MatchBoardDto;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.repository.MemberLikesRepository;
import mainproject33.domain.member.service.ProfileImageService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MatchBoardMapper {
    private final GameDBRepository gameDBRepository;

    private final MemberLikesRepository memberLikesRepository;
    private final ProfileImageService imageService;

    public MatchBoard postMatchBoardToMatchBoard(MatchBoardDto.Post post, Member member) {
        if (post == null) return null;

        MatchBoard matchBoard = new MatchBoard();

        matchBoard.setTitle(post.getTitle());
        matchBoard.setContent(post.getContent());

        GameDB game = gameDBRepository.findByKorTitle(post.getGame());
        matchBoard.setGame(game);

        matchBoard.setTeam(post.getTeam());
        matchBoard.setTags(post.getTags());

        matchBoard.setMember(member);

        return matchBoard;
    }

    public MatchBoard patchMatchBoardToMatchBoard(MatchBoardDto.Patch patch) {
        if (patch == null) return null;

        MatchBoard matchBoard = new MatchBoard();

        matchBoard.setId(patch.getId());
        matchBoard.setTitle(patch.getTitle());
        matchBoard.setContent(patch.getContent());

        GameDB game = gameDBRepository.findByKorTitle(patch.getGame());
        matchBoard.setGame(game);

        matchBoard.setTeam(patch.getTeam());
        matchBoard.setTags(patch.getTags());

        return matchBoard;
    }

    public MatchBoardDto.Response matchBoardToMatchBoardResponse(MatchBoard matchBoard) {
        if (matchBoard == null) return null;

        MatchBoardDto.Response response = new MatchBoardDto.Response();

        response.setMemberId(getMemberId(matchBoard));
        response.setIdentifier(getIdentifier(matchBoard));
        response.setNickname(getNickname(matchBoard));
        response.setProfileImage(imageService.readProfileImagePath(matchBoard.getMember().getId()));
        response.setMemberLikeCount(getMemberLikeCount(matchBoard));
        response.setId(matchBoard.getId());
        response.setTitle(matchBoard.getTitle());
        response.setContent(matchBoard.getContent());
        response.setGame(matchBoard.getGame());
        response.setTeam(matchBoard.getTeam());
        response.setTags(matchBoard.getTags());
        response.setCreatedAt(matchBoard.getCreatedAt());
        response.setModifiedAt(matchBoard.getModifiedAt());

        return response;
    }

    public List<MatchBoardDto.Response> matchBoardsToMatchBoardResponses(List<MatchBoard> matchBoards) {
        if (matchBoards == null) return null;

        List<MatchBoardDto.Response> responses = new ArrayList<>(matchBoards.size());

        for (MatchBoard board : matchBoards) {
            responses.add(matchBoardToMatchBoardResponse(board));
        }

        return responses;
    }

    private long getMemberId(MatchBoard matchBoard) {
        if (matchBoard == null) return 0L;

        Member member = matchBoard.getMember();
        if (member == null) return 0L;

        long id = member.getId();

        return id;
    }

    private String getIdentifier(MatchBoard matchBoard) {
        if (matchBoard == null) return null;

        Member member = matchBoard.getMember();
        if (member == null) return null;

        return member.getIdentifier();
    }

    private String getNickname(MatchBoard matchBoard) {
        if (matchBoard == null) return null;

        Member member = matchBoard.getMember();
        if (member == null) return null;

        return member.getNickname();
    }

    private int getMemberLikeCount(MatchBoard matchBoard) {
        if (matchBoard == null) return 0;

        Member member = matchBoard.getMember();
        if (member == null) return 0;

        return memberLikesRepository.findByLikedList(member.getId()).size();
    }
}
