package mainproject33.domain.boardfile.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject33.domain.userboard.entity.UserBoard;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class UserBoardFile
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String uploadFileName;

    //중복 된 이름의 파일을 방지하기 위해 파일을 저장할 땐 다른 이름으로 저장
    @Column
    private String storeFileName;

    @Column
    private String contentType;

    @OneToOne(fetch = FetchType.LAZY)
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
        userBoard.addUserBoardFile(this);
    }

    public void addContentType(String contentType)
    {
        this.contentType = contentType;
    }
}
