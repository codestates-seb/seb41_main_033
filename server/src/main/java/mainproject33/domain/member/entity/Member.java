package mainproject33.domain.member.entity;

import lombok.Getter;
import lombok.Setter;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.global.audit.Auditable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Member extends Auditable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String identifier;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<UserBoard> userBoards;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<MatchBoard> matchBoards;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "profile_id")
    private Profile profile;
}
