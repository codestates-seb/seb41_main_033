package mainproject33.global.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Principal { // 유저 정보를 principal 에 추가

    private String email;
    private Long id;
}
