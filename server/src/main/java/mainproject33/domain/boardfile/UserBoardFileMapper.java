/*
package mainproject33.domain.boardfile;

import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserBoardFileMapper
{
    default UserBoardFileResponse userBoardFileToResponse(UserBoardFile entity)
    {
        UserBoardFileResponse response = UserBoardFileResponse.builder()
                .id(entity.getId())
                .uploadFileName(uploadFileName(entity))
                .storeFileName(storeFileName(entity))
                .build();

        return response;
    }

    default List<UserBoardFileResponse> userBoardFileToResponses(List<UserBoardFile> entities)
    {
        List<UserBoardFileResponse> responses = entities.stream()
                .map(entity -> userBoardFileToResponse(entity))
                .collect(Collectors.toList());

        return responses;
    }

    private String uploadFileName(UserBoardFile userBoardFile)
    {
        if(userBoardFile == null)
            return null;

        String uploadFileName = userBoardFile.getUploadFileName();

        if(uploadFileName == null)
            return null;

        return uploadFileName;
    }

    private String storeFileName(UserBoardFile userBoardFile)
    {
        if(userBoardFile == null)
            return null;

        String storeFileName = userBoardFile.getStoreFileName();

        if(storeFileName == null)
            return null;

        return storeFileName;
    }
}
*/
