package mainproject33.domain.userboard.mapper;

import mainproject33.domain.like.dto.LikeResponseDto;
import mainproject33.domain.userboard.dto.UserBoardPatchDto;
import mainproject33.domain.userboard.dto.UserBoardPostDto;
import mainproject33.domain.userboard.dto.UserBoardResponseDto;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.like.entity.Like;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserBoardMapper
{
    UserBoard postToUserBoard(UserBoardPostDto request);

    UserBoard patchToUserBoard(UserBoardPatchDto request);

    default UserBoardResponseDto userBoardToResponse(UserBoard entity)
    {
        return new UserBoardResponseDto(entity);
    }

    default List<UserBoardResponseDto> userBoardToResponses(List<UserBoard> entities)
    {
        List<UserBoardResponseDto> responses = entities.stream()
                .map(entity -> userBoardToResponse(entity))
                .collect(Collectors.toList());

        return responses;
    }

    default LikeResponseDto userBoardLikeToResponse(Like entity)
    {
        return new LikeResponseDto(entity);
    }
}
