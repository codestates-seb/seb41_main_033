package mainproject33.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.repository.MemberRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import mainproject33.global.service.VerificationService;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class MailService
{
    private final MailSender mailSender;

    private final PasswordEncoder passwordEncoder;

    private final MemberRepository memberRepository;

    private final VerificationService verificationService;

    private String verificationEmailTitle = "[GAMETO] 인증 코드입니다.";

    private String reissuePasswordTitle = "[GAMETO] 임시 비밀번호입니다.";
    private String verificationText = UUID.randomUUID().toString().substring(0, 8);

    private String temporaryPassword = UUID.randomUUID().toString().substring(0, 8) + "@a1e";

    public String sendMail(String to)
    {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(verificationEmailTitle);
        simpleMailMessage.setText("[GAMETO] 인증 코드입니다.\n 인증 코드: " + verificationText);

        log.info("이메일이 전송되었습니다");
        mailSender.send(simpleMailMessage);

        return verificationText;
    }

    public void temporaryPassword(String to)
    {
        //이메일로 유저를 찾아서 비밀번호 저장

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("GAMETO");
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(reissuePasswordTitle);
        simpleMailMessage.setText("[GAMETO] 임시 비밀번호입니다.\n임시 비밀번호: " + temporaryPassword);

        mailSender.send(simpleMailMessage);
    }


    public boolean verifyEmail(String text)
    {
        log.info("text = {}", text);
        log.info("verification code = {}", verificationText);

        if(!verificationText.equals(text))
            throw new BusinessLogicException(ExceptionMessage.COMMENT_NOT_FOUND);

        return true;
    }
}
