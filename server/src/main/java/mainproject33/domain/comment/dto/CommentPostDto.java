package mainproject33.domain.comment.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class CommentPostDto
{
    @NotBlank
    private String content;
}
