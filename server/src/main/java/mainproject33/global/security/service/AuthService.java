package mainproject33.global.security.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.global.security.dto.LoginDto;
import mainproject33.global.security.dto.TokenDto;
import mainproject33.global.security.jwt.JwtTokenizer;
import mainproject33.global.security.redis.RedisDao;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenizer jwtTokenizer;
    private final RedisDao redisDao;

    public TokenDto login(LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken = loginDto.toAuthentication();

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        TokenDto tokenDto = createToken(authentication);

        UserDetails user = (UserDetails) authentication.getPrincipal();

//        redisDao.setValues(user.getUsername(), tokenDto.getRefreshToken(),
//                Duration.ofMinutes(jwtTokenizer.getRefreshTokenExpirationMinutes()));

        return tokenDto;
    }

    public TokenDto reissue(HttpServletRequest request, Authentication authentication) {

        String refreshToken = request.getHeader("refreshToken").substring(7);

        jwtTokenizer.validateToken(refreshToken);

        TokenDto tokenDto = createToken(authentication);

        UserDetails user =  (UserDetails) authentication.getPrincipal();

        redisDao.setValues(user.getUsername(), tokenDto.getRefreshToken(),
                Duration.ofMinutes(jwtTokenizer.getRefreshTokenExpirationMinutes()));

        return tokenDto;
    }

//    public void logout(UserDetails user) {
//
//        String refreshToken = redisDao.getValues(user.getUsername());
//
//        if(refreshToken == null) {
//            log.warn("Refresh Token Not Found");
//        }
//
//        redisDao.deleteValues(user.getUsername());
//    }

    private TokenDto createToken(Authentication authentication) {

        String accessToken = jwtTokenizer.generateAccessToken(authentication);
        String refreshToken = jwtTokenizer.generateRefreshToken(authentication);

        return new TokenDto(accessToken, refreshToken);
    }
}
