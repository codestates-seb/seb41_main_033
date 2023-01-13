package mainproject33.domain.like.mapper;

import mainproject33.domain.like.entity.Like;
import mainproject33.domain.like.dto.LikeResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LikeMapper
{
    default LikeResponseDto userBoardLikeToResponse(Like entity)
    {
        return new LikeResponseDto(entity);
    }
}
