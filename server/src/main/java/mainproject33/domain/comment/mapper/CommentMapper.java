package mainproject33.domain.comment.mapper;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.comment.dto.CommentPatchDto;
import mainproject33.domain.comment.dto.CommentPostDto;
import mainproject33.domain.comment.dto.CommentResponseDto;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.like.entity.Like;
import mainproject33.domain.like.repository.LikeRepository;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.service.ProfileImageService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class CommentMapper
{
    private final LikeRepository likeRepository;

    private final ProfileImageService imageService;

    public Comment commentPostToComment(CommentPostDto request)
    {
        if (request == null)
            return null;

        Comment.CommentBuilder comment = Comment.builder();

        comment.content( request.getContent() );

        return comment.build();
    }

    public Comment commentPatchToComment(CommentPatchDto request)
    {
        if (request == null)
            return null;

        Comment.CommentBuilder comment = Comment.builder();

        comment.id( request.getId() );
        comment.content( request.getContent() );

        return comment.build();
    }

    public CommentResponseDto commentToResponse(Comment entity, Member member)
    {
        if(entity == null)
            return null;

        boolean likeStatus = checkCommentLikeStatus(member, entity);

        CommentResponseDto response = CommentResponseDto.builder()
                .memberId(entity.getMember().getId())
                .identifier(entity.getMember().getIdentifier())
                .nickname(entity.getMember().getNickname())
                .profileImage(imageService.readProfileImagePath(entity.getMember().getId()))
                .userBoardId(entity.getUserBoard().getId())
                .id(entity.getId())
                .content(entity.getContent())
                .likeCount(entity.getLikes().size())
                .likeStatus(likeStatus)
                .createdAt(entity.getCreatedAt())
                .modifiedAt(entity.getModifiedAt())
                .build();
        return response;
    }


    public List<CommentResponseDto> commentToResponses(List<Comment> entities, Member member)
    {
        List<CommentResponseDto> responses = entities.stream()
                .map(entity -> commentToResponse(entity, member))
                .collect(Collectors.toList());

        return responses;
    }

    private boolean checkCommentLikeStatus(Member member, Comment comment)
    {
        if(member == null)
            return false;

        Optional<Like> optionalLike = likeRepository.findByMemberAndComment(member, comment);

        //존재 한다 = 좋아요를 했다
        return optionalLike.isPresent();
    }
}
