package mainproject33.domain.matchboard.entity;

import lombok.Getter;
import lombok.Setter;
import mainproject33.domain.member.entity.Member;
import mainproject33.global.audit.Auditable;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class MatchBoard extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
