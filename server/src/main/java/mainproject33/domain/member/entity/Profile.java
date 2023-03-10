package mainproject33.domain.member.entity;

import lombok.Getter;
import lombok.Setter;
import mainproject33.global.audit.Auditable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Profile extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "image_id")
    private ProfileImage image;

    @Column(length = 500)
    private String introduction;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> games = new ArrayList<>();

}
