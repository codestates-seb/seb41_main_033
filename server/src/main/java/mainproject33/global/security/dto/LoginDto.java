package mainproject33.global.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto { // 클라이언트 요청데이터를 역직렬화


    @NotBlank(message = "아이디에는 공백이 올 수 없습니다.")
    @Pattern(regexp = "^[A-z0-9]{4,16}$",
            message = "아이디는 한글, 특수문자가 포함될 수 없으며, 4 ~ 16자 까지만 입력이 가능합니다.")
    private String identifier;
    @NotBlank(message = "패스워드에는 공백이 올 수 없습니다.")
    @Pattern(regexp = "^(?=.*[A-z])(?=.*\\d)(?=.*[~!@])[A-z\\d~!@]{8,20}$",
            message = "패스워드는 영어, 숫자, 특수문자를 하나 씩 포함해야 하며, 8 ~ 20자 까지만 입력이 가능합니다.")
    private String password;

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(identifier, password);
    }

}
