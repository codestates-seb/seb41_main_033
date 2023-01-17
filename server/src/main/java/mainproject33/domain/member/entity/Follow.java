package mainproject33.domain.member.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "taker_id")
    private Member taker;

    @ManyToOne
    @JoinColumn(name = "giver_id")
    private Member giver;
}
