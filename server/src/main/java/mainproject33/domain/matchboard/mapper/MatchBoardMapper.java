package mainproject33.domain.matchboard.mapper;

import mainproject33.domain.matchboard.dto.MatchBoardDto;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.member.entity.Member;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MatchBoardMapper {

    public MatchBoard postMatchBoardToMatchBoard(MatchBoardDto.Post post) {
        if (post == null) return null;

        MatchBoard matchBoard = new MatchBoard();

        matchBoard.setTitle(post.getTitle());
        matchBoard.setContent(post.getContent());
        matchBoard.setTags(post.getTags());

        return matchBoard;
    }

    public MatchBoard patchMatchBoardToMatchBoard(MatchBoardDto.Patch patch) {
        if (patch == null) return null;

        MatchBoard matchBoard = new MatchBoard();

        matchBoard.setId(patch.getId());
        matchBoard.setTitle(patch.getTitle());
        matchBoard.setContent(patch.getContent());
        matchBoard.setTags(patch.getTags());

        return matchBoard;
    }

    public MatchBoardDto.Response matchBoardToMatchBoardResponse(MatchBoard matchBoard) {
        if (matchBoard == null) return null;

        MatchBoardDto.Response response = new MatchBoardDto.Response();

        response.setMemberId(matchBoardMemberId(matchBoard));
        response.setNickname(matchBoardNickname(matchBoard));
        response.setId(matchBoard.getId());
        response.setTitle(matchBoard.getTitle());
        response.setContent(matchBoard.getContent());
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

    private long matchBoardMemberId(MatchBoard matchBoard) {
        if (matchBoard == null) return 0L;

        Member member = matchBoard.getMember();
        if ( member == null ) {
            return 0L;
        }
        long id = member.getId();
        return id;
    }

    private String matchBoardNickname(MatchBoard matchBoard) {
        if (matchBoard == null) return null;

        Member member = matchBoard.getMember();
        if ( member == null ) {
            return null;
        }
        String nickname = member.getNickname();
        return nickname;
    }
}
