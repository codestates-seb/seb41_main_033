package mainproject33.domain.member.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "liker_id")
    private Member liker;

    @ManyToOne
    @JoinColumn(name = "liking_id")
    private Member liking;

}
