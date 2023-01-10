package mainproject33.global.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private final int status;
    private final String message;
    private List<ValueError> valueErrors;

    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    private ErrorResponse(final List<ValueError> valueErrors) {
        this.status = HttpStatus.BAD_REQUEST.value();
        this.message = HttpStatus.BAD_REQUEST.getReasonPhrase();
        this.valueErrors = valueErrors;
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        return new ErrorResponse(httpStatus.value(), message);
    }

    public static ErrorResponse of(BindingResult bindingResult) {
        return new ErrorResponse(ValueError.of(bindingResult));
    }

    public static ErrorResponse of(ConstraintViolationException e) {
        return new ErrorResponse(ValueError.of(e));
    }

    @Getter
    public static class ValueError {
        private final String descriptor;
        private final Object rejectedValue;
        private final String reason;

        private ValueError(String descriptor, Object rejectedValue, String reason) {
            this.descriptor = descriptor;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ValueError> of(BindingResult bindingResult) {
            return bindingResult.getFieldErrors()
                    .stream()
                    .map(error -> new ValueError(
                            error.getField(),
                            error.getRejectedValue() == null ?
                                    "" : error.getRejectedValue().toString(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }

        public static List<ValueError> of(ConstraintViolationException e) {
            return e.getConstraintViolations()
                    .stream()
                    .map(error -> new ValueError(
                            error.getPropertyPath().toString(),
                            error.getInvalidValue().toString(),
                            error.getMessage()))
                    .collect(Collectors.toList());
        }
    }
}
