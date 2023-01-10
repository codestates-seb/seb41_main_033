package mainproject33.domain.matchboard.entity;

import lombok.Getter;
import lombok.Setter;
import mainproject33.domain.gamedb.entity.GameDB;
import mainproject33.domain.member.entity.Member;
import mainproject33.global.audit.Auditable;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
public class MatchBoard extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 30, nullable = false)
    private String title;

    @Column(length = 500, nullable = false)
    private String content;

    @OneToOne
    @JoinColumn(name = "game_id")
    private GameDB game;

    @Column
    private int team;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> tags = new LinkedList<>();

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
