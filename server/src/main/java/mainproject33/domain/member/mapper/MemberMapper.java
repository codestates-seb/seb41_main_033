package mainproject33.domain.member.mapper;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.member.dto.MemberDto;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.entity.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MemberMapper {
    public Member postToMember(MemberDto.Post post) {
        if ( post == null ) return null;

        Member member = new Member();

        member.setIdentifier( post.getIdentifier() );
        member.setPassword( post.getPassword() );
        member.setNickname( post.getNickname() );

        Profile profile = new Profile();
        profile.setIntroduction("멋진 자기소개 글을 써주세요!");
        profile.setGames(new ArrayList<>());

        member.setProfile(profile);

        return member;
    }

    public Member patchToMember(MemberDto.Patch patch) {
        if ( patch == null ) return null;

        Member member = new Member();

        member.setNickname( patch.getNickname() );

        Profile profile = new Profile();
        profile.setBase64EncodedFile(patch.getImage());
        profile.setIntroduction(patch.getIntroduction());
        profile.setGames(patch.getGames());

        member.setProfile(profile);

        return member;
    }

    public MemberDto.Response memberToResponse(Member member) {
        if ( member == null ) return null;

        Long id = member.getId();
        String identifier = member.getIdentifier();
        String password = member.getPassword();
        String nickname = member.getNickname();
        Profile profile = member.getProfile();
        LocalDateTime createdAt = member.getCreatedAt();
        LocalDateTime modifiedAt = member.getModifiedAt();

        MemberDto.Response response = new MemberDto.Response( id, identifier, password, nickname, profile, createdAt, modifiedAt );

        return response;
    }

    public List<MemberDto.Response> membersToResponses(List<Member> members) {
        if ( members == null ) return null;

        List<MemberDto.Response> list = new ArrayList<MemberDto.Response>( members.size() );
        for ( Member member : members ) {
            list.add( memberToResponse( member ) );
        }

        return list;
    }
}
