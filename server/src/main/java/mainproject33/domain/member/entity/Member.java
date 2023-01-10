package mainproject33.domain.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.matchboard.entity.MatchBoard;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.global.audit.Auditable;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String nickname;

    private String image;

    private String introduction;

    private String game;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<UserBoard> userBoards;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<MatchBoard> matchBoards;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Comment> comments;

}
