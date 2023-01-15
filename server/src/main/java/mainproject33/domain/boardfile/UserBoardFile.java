package mainproject33.domain.boardfile;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject33.domain.userboard.entity.UserBoard;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class UserBoardFile
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uploadFileName;

    //중복 된 이름의 파일을 방지하기 위해 파일을 저장할 땐 다른 이름으로 저장
    private String storeFileName;

    @ManyToOne
    @JoinColumn(name = "user_board_id")
    private UserBoard userBoard;
    @Builder
    public UserBoardFile(String uploadFileName, String storeFileName)
    {
        this.uploadFileName = uploadFileName;
        this.storeFileName = storeFileName;
    }

    public void addUserBoard(UserBoard userBoard)
    {
        this.userBoard = userBoard;
        if(!userBoard.getUserBoardFiles().contains(this))
        {
            userBoard.getUserBoardFiles().add(this);
        }
    }
}
