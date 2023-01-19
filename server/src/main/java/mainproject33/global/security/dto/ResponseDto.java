package mainproject33.global.security.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ResponseDto {
    private Long id;
    private String identifier;
    private String nickname;
    private LocalDateTime createdAt;
}
