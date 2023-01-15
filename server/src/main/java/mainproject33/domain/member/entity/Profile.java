package mainproject33.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import mainproject33.global.audit.Auditable;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Profile extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @OneToOne
    @JoinColumn(name = "image_id")
    private ProfileImage image;

    @Column
    private String introduction;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> games;

    @Transient
    @JsonIgnore
    private String base64EncodedFile;
}
