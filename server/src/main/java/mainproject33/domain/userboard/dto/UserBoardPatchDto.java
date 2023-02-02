package mainproject33.domain.userboard.dto;

import lombok.Getter;
import lombok.Setter;
import mainproject33.global.validator.notspace.NotSpace;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UserBoardPatchDto
{
    private long id;

    @Length(min = 3, message = "내용은  최소 3글자 이상 입력 해야합니다.")
    @Length(max = 500, message = "내용은  최대 500자 까지 입력 가능합니다.")
    @NotSpace
    private String content;

}
