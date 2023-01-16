package mainproject33.global.exception;

import lombok.Getter;

public enum ExceptionMessage {
    //=========matchBoard=========//
    MATCH_BOARD_NOT_FOUND("존재하지 않는 매칭 게시글 입니다."),
    MATCH_BOARD_ID_NOT_FOUND("존재하지 않는 매칭 게시글 식별자 입니다."),

    //=========member=========//

    MEMBER_NOT_FOUND("존재하지 않는 회원 입니다."),
    MEMBER_UNAUTHORIZED("권한이 없습니다."),
    MEMBER_EXISTS("회원이 이미 존재합니다."),

    SELF_FOLLOW_NOT_ALLOWED("자기 자신을 팔로우 할 수 없습니다."),

    SELF_LIKE_NOT_ALLOWED("자기 자신을 좋아요 할 수 없습니다."),

    //=========userBoard=========//
    USER_BOARD_NOT_FOUND("존재하지 않는 게시글입니다."),



    //=========comment=========//
    COMMENT_NOT_FOUND("존재하지 않는 답글입니다."),

    //=========image=========//
    IMAGE_DATA_NOT_FOUND("존재하지 않는 프로필 이미지 데이터입니다."),
    FILE_NOT_FOUND("존재하지 않는 파일입니다.");



    @Getter
    private final String message;


    ExceptionMessage(String message) {
        this.message = message;
    }

    public String get() {
        return message;
    }
}
