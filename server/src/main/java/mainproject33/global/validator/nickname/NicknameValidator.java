package mainproject33.global.validator.nickname;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
public class NicknameValidator implements ConstraintValidator<Nickname, String>
{

    @Override
    public void initialize(Nickname constraintAnnotation)
    {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context)
    {
        if (value != null) {
            String reg = "^[A-z0-9가-힣]{2,8}$";
            return value.matches(reg);
        }
        return true;
    }
}
