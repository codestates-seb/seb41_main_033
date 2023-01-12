package mainproject33.config;

import lombok.RequiredArgsConstructor;
import mainproject33.global.security.filter.JwtAuthenticationFilter;
import mainproject33.global.security.filter.JwtVerificationFilter;
import mainproject33.global.security.jwt.JwtTokenizer;
import mainproject33.global.security.service.AuthService;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class CustomFilterConfiguration extends AbstractHttpConfigurer<CustomFilterConfiguration, HttpSecurity> {

    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;

    @Override
    public void configure(HttpSecurity http) {

        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtTokenizer);
        JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authService);

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtVerificationFilter, JwtAuthenticationFilter.class);
    }
}
