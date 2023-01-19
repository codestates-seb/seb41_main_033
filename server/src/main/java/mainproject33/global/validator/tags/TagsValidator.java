package mainproject33.global.validator.tags;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

public class TagsValidator implements ConstraintValidator<Tags, List<String>> {
    @Override
    public boolean isValid(List<String> value, ConstraintValidatorContext context) {

        for (String s : value) {
            if (!s.matches("#[A-zㄱ-ㅎ가-힣0-9]{1,6}")) return false;
        }
        return true;
    }
}
