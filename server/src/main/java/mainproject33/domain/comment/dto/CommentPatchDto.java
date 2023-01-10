package mainproject33.domain.comment.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CommentPatchDto
{
    private Long id;

    @NotNull
    private String content;
}
