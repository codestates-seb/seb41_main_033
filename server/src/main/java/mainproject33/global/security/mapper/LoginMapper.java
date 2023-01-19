package mainproject33.global.security.mapper;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.repository.MemberRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import mainproject33.global.security.dto.LoginDto;
import mainproject33.global.security.dto.ResponseDto;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class LoginMapper {

    private final MemberRepository memberRepository;

    public ResponseDto loginDtoToResponse(LoginDto loginDto) {

        ResponseDto responseDto = new ResponseDto();

        Optional<Member> loginMember = memberRepository.findByIdentifier(loginDto.getIdentifier());

        if(loginMember.isEmpty()) {
            throw new BusinessLogicException(ExceptionMessage.MEMBER_NOT_FOUND);
        }

        responseDto.setId(loginMember.get().getId());
        responseDto.setIdentifier(loginMember.get().getIdentifier());
        responseDto.setNickname(loginMember.get().getNickname());
        responseDto.setCreatedAt(loginMember.get().getCreatedAt());

        return responseDto;
    }
}
