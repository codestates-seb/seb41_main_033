package mainproject33.global.validator.identifier;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class IdentifierValidator implements ConstraintValidator<Identifier, String>
{
    @Override
    public void initialize(Identifier constraintAnnotation)
    {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context)
    {
        String reg = "^[A-z0-9]{4,16}";

        return value.matches(reg);
    }
}
