package mainproject33.domain.comment.dto;

import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

@Getter
public class CommentPostDto
{
    @NotNull
    private String content;
}
