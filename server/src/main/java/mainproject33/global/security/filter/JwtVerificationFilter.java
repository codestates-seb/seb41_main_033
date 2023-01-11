package mainproject33.global.security.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import mainproject33.global.security.dto.Principal;
import mainproject33.global.security.jwt.JwtTokenizer;
import mainproject33.global.security.utils.CustomAuthorityUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, // JWT 토큰 검증 및 SecurityContext 에 Authentication 저장
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException { // 조건 부합 시 동작 수행 x

        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) { // 요청에 대한 JWT 검증

        String jws = request.getHeader("Authorization").replace("Bearer", "");

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
    }

    private void setAuthenticationToContext(Map<String, Object> claims) { // securityContext 에 저장

        String email = (String) claims.get("email");

        Long id = Long.valueOf((Integer) claims.get("id"));

        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));

        Authentication authentication = new UsernamePasswordAuthenticationToken(new Principal(email, id), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
