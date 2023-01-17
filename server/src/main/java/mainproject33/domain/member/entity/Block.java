package mainproject33.domain.member.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "blocker_id")
    private Member Blocker;

    @ManyToOne
    @JoinColumn(name = "blocking_id")
    private Member Blocking;
}