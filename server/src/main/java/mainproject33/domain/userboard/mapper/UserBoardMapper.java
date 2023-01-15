package mainproject33.domain.userboard.mapper;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.boardfile.UserBoardFile;
import mainproject33.domain.boardfile.UserBoardFileRepository;
import mainproject33.domain.boardfile.UserBoardFileResponse;
import mainproject33.domain.userboard.dto.UserBoardPatchDto;
import mainproject33.domain.userboard.dto.UserBoardPostDto;
import mainproject33.domain.userboard.dto.UserBoardResponseDto;
import mainproject33.domain.userboard.entity.UserBoard;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class UserBoardMapper
{
    private final UserBoardFileRepository fileRepository;
    public UserBoard postToUserBoard(UserBoardPostDto request)
    {
        if(request == null)
            return null;

        UserBoard userBoard = UserBoard.builder()
                .content(request.getContent())
                .build();

        return userBoard;
    }

    public UserBoard patchToUserBoard(UserBoardPatchDto request)
    {
        if(request == null)
            return null;

        UserBoard userBoard = UserBoard.builder()
                .id(request.getId())
                .content(request.getContent())
                .build();

        return userBoard;
    }

    public UserBoardResponseDto userBoardToResponse(UserBoard entity)
    {
        if(entity == null)
            return null;

        List<UserBoardFile> userBoardFiles = entity.getUserBoardFiles();

        List<String> uploadFilenames = new ArrayList<>();

        for (String uploadFilename : uploadFilenames)
        {
            uploadFilenames.add(fileRepository.findUploadFileNameByUserBoardId(entity.getId()));
        }

        UserBoardResponseDto response = UserBoardResponseDto.builder()
                .memberId(entity.getMember().getId())
                .nickname(entity.getMember().getNickname())
                .id(entity.getId())
                .content(entity.getContent())
                .uploadFileNames(uploadFilenames)
                .commentCount(entity.getComments().size())
                .likeCount(entity.getLikeCount())
                .createdAt(entity.getCreatedAt())
                .modifiedAt(entity.getModifiedAt())
                .build();

        return response;
    }

    public List<UserBoardResponseDto> userBoardToResponses(List<UserBoard> entities)
    {
        List<UserBoardResponseDto> responses = entities.stream()
                .map(entity -> userBoardToResponse(entity))
                .collect(Collectors.toList());

        return responses;
    }
}
