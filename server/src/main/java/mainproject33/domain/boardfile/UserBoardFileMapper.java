package mainproject33.domain.boardfile;

import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserBoardFileMapper
{
    default UserBoardFileResponse userBoardFileToResponse(UserBoardFile entity)
    {
        return new UserBoardFileResponse(entity);
    }

    default List<UserBoardFileResponse> userBoardFileToResponses(List<UserBoardFile> entities)
    {
        List<UserBoardFileResponse> responses = entities.stream()
                .map(entity -> userBoardFileToResponse(entity))
                .collect(Collectors.toList());

        return responses;
    }
}
