package mainproject33.domain.userboard.mapper;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.boardfile.entity.UserBoardFile;
import mainproject33.domain.boardfile.service.UserBoardFileService;
import mainproject33.domain.comment.mapper.CommentMapper;
import mainproject33.domain.like.entity.Like;
import mainproject33.domain.like.repository.LikeRepository;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.service.ProfileImageService;
import mainproject33.domain.userboard.dto.UserBoardPatchDto;
import mainproject33.domain.userboard.dto.UserBoardPostDto;
import mainproject33.domain.userboard.dto.UserBoardResponseDto;
import mainproject33.domain.userboard.entity.UserBoard;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class UserBoardMapper
{
    private final LikeRepository likeRepository;

    private final UserBoardFileService fileService;

    private final ProfileImageService imageService;
    private final CommentMapper commentMapper;
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

    public UserBoardResponseDto userBoardToResponse(UserBoard entity, Member member)
    {
        if(entity == null)
            return null;

        boolean likeStatus = checkBoardLikeStatus(member, entity);


        UserBoardResponseDto response = UserBoardResponseDto.builder()
                //멤버 정보
                .memberId(entity.getMember().getId())
                .identifier(entity.getMember().getIdentifier())
                .nickname(entity.getMember().getNickname())
                .profileImage(imageService.readProfileImagePath(entity.getMember().getId()))

                //게시판 정보
                .id(entity.getId())
                .content(entity.getContent())
                .uploadFileName(fileService.readUserBoardFilePath(entity.getId()))
                .contentType(getContentType(entity))
                .commentCount(entity.getComments().size())
                .likeCount(entity.getLikeCount())
                .likeStatus(likeStatus)
                .createdAt(entity.getCreatedAt())
                .modifiedAt(entity.getModifiedAt())

                //댓글 정보
                .comments(commentMapper.commentToResponses(entity.getComments(), member))
                .build();

        return response;
    }

    public List<UserBoardResponseDto> userBoardToResponses(List<UserBoard> entities, Member member)
    {
        List<UserBoardResponseDto> responses = entities.stream()
                .map(entity -> userBoardToResponse(entity, member))
                .collect(Collectors.toList());

        return responses;
    }

    private String getContentType(UserBoard userBoard)
    {
        if(userBoard == null)
            return null;

        UserBoardFile userBoardFile = userBoard.getUserBoardFile();
        if(userBoardFile == null)
            return null;

        String contentType = userBoardFile.getContentType();

        if(contentType == null)
            return null;

        return contentType;
    }

    private boolean checkBoardLikeStatus(Member member, UserBoard userBoard)
    {
        if(member == null)
            return false;

        Optional<Like> optionalLike = likeRepository.findByMemberAndUserBoard(member, userBoard);

        //optionalLike 존재한다 = 좋아요를 눌렀다
        //true 리턴 => 좋아요를 이미 눌렀다
        return optionalLike.isPresent();
    }
}
