package mainproject33.global.validator.password;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<Password, String>
{
    @Override
    public void initialize(Password constraintAnnotation)
    {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context)
    {
        String reg = "^(?=.*[A-z])(?=.*\\d)(?=.*[~!@])[A-z\\d~!@]{8,20}$";

        return value.matches(reg);
    }
}
