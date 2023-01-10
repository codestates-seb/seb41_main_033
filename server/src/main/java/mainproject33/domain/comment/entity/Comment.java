package mainproject33.domain.comment.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.global.audit.Auditable;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Comment extends Auditable
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "user_board_id")
    private UserBoard userBoard;

    @Builder
    public Comment(Long id, String content)
    {
        this.id = id;
        this.content = content;
    }

    public void updateComment(String content)
    {
        this.content = content;
    }

    public void addUserBoard(UserBoard userBoard)
    {
        this.userBoard = userBoard;
        if(!userBoard.getComments().contains(this))
            userBoard.getComments().add(this);
    }
}
