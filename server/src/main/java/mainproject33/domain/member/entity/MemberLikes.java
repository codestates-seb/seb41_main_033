package mainproject33.domain.member.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class MemberLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "liker_id")
    private Member liker;

    @ManyToOne
    @JoinColumn(name = "liked_id")
    private Member liked;
}