package mainproject33.domain.member.mapper;

import mainproject33.domain.member.dto.MemberDto;
import mainproject33.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member postToMember(MemberDto.Post post);
    Member patchToMember(MemberDto.Patch patch);
    MemberDto.Response memberToResponse(Member member);
    List<MemberDto.Response> membersToResponses(List<Member> members);
}
