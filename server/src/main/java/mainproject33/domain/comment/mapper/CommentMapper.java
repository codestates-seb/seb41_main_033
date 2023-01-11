package mainproject33.domain.comment.mapper;

import mainproject33.domain.comment.dto.CommentPatchDto;
import mainproject33.domain.comment.dto.CommentPostDto;
import mainproject33.domain.comment.dto.CommentResponseDto;
import mainproject33.domain.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CommentMapper
{
    Comment commentPostToComment(CommentPostDto request);

    Comment commentPatchToComment(CommentPatchDto request);

    default CommentResponseDto commentToResponse(Comment entity)
    {
        return new CommentResponseDto(entity);
    }

    default List<CommentResponseDto> commentToResponses(List<Comment> entities)
    {
        List<CommentResponseDto> responses = entities.stream()
                .map(entity -> commentToResponse(entity))
                .collect(Collectors.toList());

        return responses;
    }
}