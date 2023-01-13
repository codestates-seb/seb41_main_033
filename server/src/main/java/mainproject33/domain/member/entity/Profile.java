package mainproject33.domain.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@DynamicInsert
public class Profile {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String image;

    @ColumnDefault("0")
    private int follower;

    @ColumnDefault("0")
    private int following;

    @ColumnDefault("0")
    private int like;

    @ColumnDefault("false")
    private boolean block;

    private List<String> games;

    @Column(length = 500)
    private String introduction;

}
