package mainproject33.domain.comment.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.like.entity.Like;
import mainproject33.global.audit.Auditable;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Comment extends Auditable
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_board_id")
    private UserBoard userBoard;


    @OneToMany(mappedBy = "comment", cascade = CascadeType.REMOVE)
    private Set<Like> likes = new HashSet<>();

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

    public void addMember(Member member)
    {
        this.member = member;
        if(member.getComments().contains(this))
            member.getComments().add(this);
    }

    public void addUserBoard(UserBoard userBoard)
    {
        this.userBoard = userBoard;
        if(!userBoard.getComments().contains(this))
            userBoard.getComments().add(this);
    }

}
