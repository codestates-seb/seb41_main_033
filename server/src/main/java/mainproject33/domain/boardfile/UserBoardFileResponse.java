package mainproject33.domain.boardfile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserBoardFileResponse
{
    private Long id;

    private String uploadFileName;

    private String storeFileName;

    public UserBoardFileResponse(UserBoardFile entity)
    {
        this.id = entity.getId();
        this.uploadFileName = entity.getUploadFileName();
        this.storeFileName = entity.getStoreFileName();
    }
}
