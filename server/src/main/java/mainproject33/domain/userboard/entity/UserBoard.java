package mainproject33.domain.userboard.entity;

import lombok.*;

import mainproject33.domain.comment.entity.Comment;
import mainproject33.domain.like.entity.Like;
import mainproject33.domain.member.entity.Member;
import mainproject33.global.audit.Auditable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@NoArgsConstructor
@Entity
public class UserBoard extends Auditable
{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    private int likeCount = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "userBoard", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "userBoard", cascade = CascadeType.REMOVE)
    private Set<Like> likes = new HashSet<>();

    @Builder
    public UserBoard(Long id, String content)
    {
        this.id = id;
        this.content = content;
    }

    public void updateContent(String content)
    {
        this.content = content;
    }

    public void addLike()
    {
        this.likeCount++;
    }

    public void unLike()
    {
        this.likeCount--;
    }
}