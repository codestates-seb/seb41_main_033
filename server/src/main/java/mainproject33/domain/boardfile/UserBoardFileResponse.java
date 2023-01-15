package mainproject33.domain.boardfile;

import lombok.*;

@Getter
@Setter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserBoardFileResponse
{
    private Long id;

    private String uploadFileName;

    private String storeFileName;
}
