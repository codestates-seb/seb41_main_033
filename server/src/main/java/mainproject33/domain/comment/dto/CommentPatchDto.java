package mainproject33.domain.comment.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class CommentPatchDto
{
    private Long id;

    @NotBlank
    private String content;
}
