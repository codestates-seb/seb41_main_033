package mainproject33.domain.like.mapper;

import mainproject33.domain.like.entity.Like;
import mainproject33.domain.like.dto.LikeResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LikeMapper
{
    default LikeResponseDto userBoardLikeToResponse(Like entity)
    {
        LikeResponseDto boardLikeResponseDto = LikeResponseDto.builder()
                .memberId(entity.getMember().getId())
                .nickname(entity.getMember().getNickname())
                .boardId(entity.getUserBoard().getId())
                .createdAt(entity.getCreatedAt())
                .build();

        return boardLikeResponseDto;
    }

    default LikeResponseDto commentLikeToResponse(Like entity)
    {
        LikeResponseDto commentLikeResponseDto = LikeResponseDto.builder()
                .memberId(entity.getMember().getId())
                .nickname(entity.getMember().getNickname())
                .commentId(entity.getComment().getId())
                .createdAt(entity.getCreatedAt())
                .build();

        return commentLikeResponseDto;
    }
}
