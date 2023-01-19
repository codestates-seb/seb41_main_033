package mainproject33.global.security.advice;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;
import mainproject33.global.exception.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class JwtExceptionAdvice {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleExpiredJwtException(ExpiredJwtException e) {
        log.error("만료된 Refresh Token 입니다.", e);

        return ErrorResponse.of(HttpStatus.UNAUTHORIZED, e.getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleMalformedJwtException(MalformedJwtException e) {
        log.error("잘못된 Refresh Token 서명입니다.", e);

        return ErrorResponse.of(HttpStatus.UNAUTHORIZED, e.getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleUnsupportedJwtException(UnsupportedJwtException e) {
        log.error("지원되지 않는 Access Token 입니다.", e);

        return ErrorResponse.of(HttpStatus.UNAUTHORIZED, e.getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleIllegalArgumentException(IllegalArgumentException e) {
        log.error("Refresh Token 이 잘못되었습니다.", e);

        return ErrorResponse.of(HttpStatus.UNAUTHORIZED, e.getMessage());
    }
}
