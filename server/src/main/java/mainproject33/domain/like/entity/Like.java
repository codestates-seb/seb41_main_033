package mainproject33.domain.like.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.userboard.entity.UserBoard;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "likes")
@NoArgsConstructor
public class Like
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_board_id")
    private UserBoard userBoard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;


    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Like(Member member, UserBoard userBoard)
    {
        this.member = member;
        this.userBoard = userBoard;
    }

    public Like(Member member, Comment comment)
    {
        this.member = member;
        this.comment = comment;
    }
}
