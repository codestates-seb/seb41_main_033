package mainproject33.domain.userboard.dto;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Getter
public class UserBoardPostDto
{
    @Length(min = 3, message = "내용은  최소 3글자 이상 입력 해야합니다.")
    @Length(max = 500, message = "내용은  최대 500자 까지 입력 가능합니다.")
    private String content;

}
