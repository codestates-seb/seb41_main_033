package mainproject33.global.exception;

import lombok.Getter;

public class BusinessLogicException extends RuntimeException
{
    @Getter
    private ExceptionMessage exceptionMessage;

    public BusinessLogicException(ExceptionMessage exceptionMessage)
    {
        super(exceptionMessage.getMessage());
        this.exceptionMessage = exceptionMessage;
    }
}
