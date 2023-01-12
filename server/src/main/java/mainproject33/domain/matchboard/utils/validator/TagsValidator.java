package mainproject33.domain.matchboard.utils.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

public class TagsValidator implements ConstraintValidator<Tags, List<String>> {
    @Override
    public boolean isValid(List<String> value, ConstraintValidatorContext context) {

        for (String s : value) {
            if (!s.matches("#[a-z]{1,6}|#[가-힣]{1,6}")) return false;
        }
        return true;
    }
}
