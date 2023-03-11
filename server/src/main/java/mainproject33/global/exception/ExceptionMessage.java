package mainproject33.global.exception;

import lombok.Getter;

public enum ExceptionMessage {
    //=========matchBoard=========//
    MATCH_BOARD_NOT_FOUND("존재하지 않는 매칭 게시글입니다."),
    MATCH_BOARD_ID_NOT_FOUND("존재하지 않는 매칭 게시글 식별자입니다."),
    MATCH_BOARD_BLOCKED("차단된 회원의 매칭 게시글입니다."),

    //=========member=========//

    MEMBER_NOT_FOUND("존재하지 않는 회원 입니다."),
    MEMBER_UNAUTHORIZED("권한이 없습니다."),
    MEMBER_EXISTS("회원이 이미 존재합니다."),

    SELF_FOLLOW_NOT_ALLOWED("자기 자신을 팔로우 할 수 없습니다."),
    FOLLOW_NOT_FOUND("존재하지 않는 팔로우 정보입니다."),

    SELF_LIKE_NOT_ALLOWED("자기 자신을 좋아요 할 수 없습니다."),
    LIKE_NOT_FOUND("존재하지 않는 좋아요 정보입니다."),

    SELF_BLOCK_NOT_ALLOWED("자기 자신을 차단 할 수 없습니다."),
    CAN_NOT_FOLLOW_BLOCK_EXISTS("차단이 되어 있으면 팔로우를 할 수 없습니다."),
    CAN_NOT_LIKE_BLOCK_EXISTS("차단이 되어 있으면 좋아요를 할 수 없습니다."),

    //=========userBoard=========//
    USER_BOARD_NOT_FOUND("존재하지 않는 게시글입니다."),

    //=========comment=========//
    COMMENT_NOT_FOUND("존재하지 않는 답글입니다."),

    //=========image=========//
    IMAGE_DATA_NOT_FOUND("존재하지 않는 프로필 이미지 데이터입니다."),
    FILE_NOT_FOUND("존재하지 않는 파일입니다."),

    //=========user board file=========//

    EXT_NOT_ACCEPTED("확장자 명이 올바르지 않습니다."),

    //=========oauth2=========//

    GOOGLE_USER_INFO_NOT_FOUND("구글 정보조회에 실패했습니다.");

    @Getter
    private final String message;


    ExceptionMessage(String message) {
        this.message = message;
    }

    public String get() {
        return message;
    }
}
