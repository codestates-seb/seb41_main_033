package mainproject33.global.security.controller;

import lombok.RequiredArgsConstructor;
import mainproject33.global.dto.SingleResponseDto;
import mainproject33.global.security.dto.LoginDto;
import mainproject33.global.security.dto.ResponseDto;
import mainproject33.global.security.dto.TokenDto;
import mainproject33.global.security.mapper.LoginMapper;
import mainproject33.global.security.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
@Validated
public class AuthController {

    private final AuthService authService;
    private final LoginMapper loginMapper;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDto loginDto, HttpServletResponse response) {

        TokenDto tokenDto = authService.login(loginDto);

        response.addHeader("Authorization", tokenDto.getAccessToken());
        response.addHeader("RefreshToken", tokenDto.getRefreshToken());

        ResponseDto responseDto = loginMapper.loginDtoToResponse(loginDto);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(@AuthenticationPrincipal UserDetails user) {

        if(user != null) {
            authService.logout(user);

            return new ResponseEntity<>("Logout Successful!", HttpStatus.OK);
        } else {
            throw new NoSuchElementException("회원 정보를 불러올 수 없습니다. 토큰을 확인 해주세요.");
        }
    }
}
