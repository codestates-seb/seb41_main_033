package mainproject33.global.security.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.global.security.dto.TokenDto;
import mainproject33.global.security.jwt.JwtTokenizer;
import mainproject33.global.security.service.AuthService;
import mainproject33.global.security.utils.ErrorResponder;
import mainproject33.global.security.utils.HeaderMapRequestWrapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtExceptionHandlerFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, // JWT 토큰 검증 및 SecurityContext 에 Authentication 저장
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        HeaderMapRequestWrapper wrapper = new HeaderMapRequestWrapper(request); // 토큰 재발급시 덮어쓰기 위한 wrapper 객체

        try {
            filterChain.doFilter(request, response);
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.error("잘못된 Access Token 서명입니다.", e);
            ErrorResponder.sendJwtErrorResponse(response, e.getMessage());

        } catch (UnsupportedJwtException e) {
            ErrorResponder.sendJwtErrorResponse(response, e.getMessage());
            log.error("지원되지 않는 Access Token 입니다.", e);

        } catch (IllegalArgumentException e) {
            ErrorResponder.sendJwtErrorResponse(response, e.getMessage());
            log.error("Access Token 이 잘못되었습니다.", e);

        } catch (ExpiredJwtException e) {
            log.error("만료된 Access Token 입니다. 재발급을 진행합니다.");

            String refreshToken = resolveRefreshToken(request); // request header 에서 refreshToken 추출

            Authentication authentication = jwtTokenizer.getAuthentication(refreshToken); // refreshToken으로 authentication 생성

            SecurityContextHolder.getContext().setAuthentication(authentication); // contextHolder에 저장된 authentication을 바꿔 줌

            TokenDto tokenDto = authService.reissue(request, authentication); // 토큰 재발급
            setHeaderResponse(wrapper, response, tokenDto); // header, response 값 재설정

            log.error("Access Token, Refresh Token 재발급이 완료되었씁니다.");

            filterChain.doFilter(wrapper, response);
        }
    }

    private String resolveRefreshToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("RefreshToken");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    private void setHeaderResponse(HeaderMapRequestWrapper wrapper,
                                   HttpServletResponse response,
                                   TokenDto tokenDto) {

        // accessToken, refreshToken Header 값 새로 덮어쓰기
        wrapper.addHeader("Authorization", tokenDto.getAccessToken());
        wrapper.addHeader("RefreshToken", tokenDto.getRefreshToken());

        //reissue(재발급) 후 response header 에 새로운 accessToken,refreshToken 추가
        response.addHeader("Authorization", tokenDto.getAccessToken());
        response.addHeader("RefreshToken", tokenDto.getRefreshToken());
    }

}
