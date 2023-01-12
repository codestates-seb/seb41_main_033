package mainproject33.global.security.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.global.security.dto.Principal;
import mainproject33.global.security.jwt.JwtTokenizer;
import mainproject33.global.security.service.AuthService;
import mainproject33.global.security.utils.CustomAuthorityUtils;
import mainproject33.global.security.utils.HeaderMapRequestWrapper;
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

@Slf4j
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, // JWT 토큰 검증 및 SecurityContext 에 Authentication 저장
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        HeaderMapRequestWrapper wrapper = new HeaderMapRequestWrapper(request);

        filterChain.doFilter(request, response);
    }

}
