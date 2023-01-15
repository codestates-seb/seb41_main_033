package mainproject33.domain.member.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


}
