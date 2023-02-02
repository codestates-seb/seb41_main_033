package mainproject33.domain.gamedb.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "game_db")
@Getter
@Setter
public class GameDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String korTitle;

    @Column(nullable = false)
    private String engTitle;
}
