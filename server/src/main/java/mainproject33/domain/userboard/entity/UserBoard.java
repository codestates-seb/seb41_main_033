package mainproject33.domain.userboard.entity;

import lombok.*;
import mainproject33.domain.member.entity.Member;
import mainproject33.global.audit.Auditable;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class UserBoard extends Auditable
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @Builder
    public UserBoard(Long id, String content)
    {
        this.id = id;
        this.content = content;
    }

    public void updateContent(String content)
    {
        this.content = content;
    }

    //member 추가 시 자동으로 member 에도 userBoard 추가
    /*public void addMember(Member member)
    {
        this.member = member;
        member.getUserBoards().add(this);
    }*/

}
