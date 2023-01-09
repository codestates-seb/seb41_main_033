package mainproject33.domain.matchboard.utils.validator;

import javax.validation.Constraint;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TagsValidator.class)
public @interface Tags {

    String message() default "태그는 띄어쓰기 없이 영문 소문자 15자 이하, 한글 6자 이하로 이루어져 있어야 합니다.";
    Class[] groups() default {};
    Class[] payload() default {};
}
