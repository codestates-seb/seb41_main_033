package mainproject33.config;

import lombok.RequiredArgsConstructor;
import mainproject33.global.security.jwt.JwtTokenizer;
import mainproject33.global.security.service.AuthService;
import mainproject33.global.security.utils.CustomAuthorityUtils;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;



}
