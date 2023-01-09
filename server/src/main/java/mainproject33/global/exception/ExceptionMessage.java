package mainproject33.global.exception;

public enum ExceptionMessage {
    MATCH_BOARD_NOT_FOUND("존재하지 않는 매칭 게시글 입니다.");

    private final String message;

    ExceptionMessage(String message) {
        this.message = message;
    }

    public String get() {
        return message;
    }
}
