package mainproject33.global.security.userdetails;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.repository.MemberRepository;
import mainproject33.global.security.utils.CustomAuthorityUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberDetailsService { // 크리덴셜 조회 후 크리덴셜을 AuthenticationManager 에게 전달하는 클래스

    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다."));

        return new MemberDetails(findMember);
    }

    private final class MemberDetails extends Member implements UserDetails {

        MemberDetails(Member member) {
            setId(member.getId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
