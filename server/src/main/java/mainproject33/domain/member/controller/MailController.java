package mainproject33.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.domain.member.dto.EmailDto;
import mainproject33.domain.member.dto.MemberDto;
import mainproject33.domain.member.service.MailService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@Slf4j
@RequestMapping("/api/email")
@RestController
@RequiredArgsConstructor
public class MailController
{
    private final MailService mailService;

    @PostMapping
    public String sendMail(@Valid @RequestBody MemberDto.EmailPost emailPost)
    {
        String verification = mailService.sendMail(emailPost.getEmail());

        log.info("verification code = ", verification);
        return "이메일 전송 성공";
    }

    @PostMapping("/verification")
    public boolean verificationEmail(@RequestBody EmailDto text)
    {
        return mailService.verifyEmail(text.getText());
    }

    @PostMapping("/verification/reissue")
    public String reissuePassword(@RequestBody MemberDto.EmailPost emailPost)
    {
        mailService.temporaryPassword(emailPost.getEmail());

        return "임시 비밀번호가 발급 되었습니다.";
    }

}
