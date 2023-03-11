package mainproject33.domain.member.repository;

import mainproject33.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByIdentifier(String identifier);

    Optional<Member> findByEmail(String email);
}
