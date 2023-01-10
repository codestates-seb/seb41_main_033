package mainproject33.domain.userboard.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
public class UserBoardPostDto
{
    @NotBlank
    String content;

}
