package mainproject33.global.validator.password;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordValidator.class)
public @interface Password
{
    String message() default  "패스워드는 영어, 숫자, 특수문자를 하나 씩 포함해야 하며, 8 ~ 20자 까지만 입력이 가능합니다.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
