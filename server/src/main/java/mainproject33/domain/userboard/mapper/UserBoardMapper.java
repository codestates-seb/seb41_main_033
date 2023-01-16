package mainproject33.domain.userboard.mapper;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.boardfile.entity.UserBoardFile;
import mainproject33.domain.boardfile.repository.UserBoardFileRepository;
import mainproject33.domain.userboard.dto.UserBoardPatchDto;
import mainproject33.domain.userboard.dto.UserBoardPostDto;
import mainproject33.domain.userboard.dto.UserBoardResponseDto;
import mainproject33.domain.userboard.entity.UserBoard;
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


        UserBoardResponseDto response = UserBoardResponseDto.builder()
                .memberId(entity.getMember().getId())
                .nickname(entity.getMember().getNickname())
                .id(entity.getId())
                .content(entity.getContent())
                .uploadFileName(getUploadFileName(entity))
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

    private String getUploadFileName(UserBoard userBoard)
    {
        if(userBoard == null)
            return null;

        UserBoardFile userBoardFile = userBoard.getUserBoardFile();
        if(userBoardFile == null)
            return null;

        String uploadFileName = userBoardFile.getUploadFileName();
        if(uploadFileName == null)
            uploadFileName = "";

        return uploadFileName;
    }
}
