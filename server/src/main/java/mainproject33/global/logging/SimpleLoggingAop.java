package mainproject33.global.logging;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Slf4j
@Aspect
@Component
public class SimpleLoggingAop {

    @Pointcut("execution(public * *(..))")
    private void anyPublicOperation() {}

    @Pointcut("within(mainproject33.domain.matchboard.service..*)")
    private void inMatchBoard() {}

    @Pointcut("within(mainproject33.domain.gamedb.service..*)")
    private void inGameDB() {}

    @Pointcut("within(mainproject33.domain.comment.service..*)")
    private void inComment() {}

    @Pointcut("within(mainproject33.domain.member.service..*)")
    private void inMember() {}

    @Pointcut("within(mainproject33.domain.userboard.service..*)")
    private void inUserBoard() {}

    @Pointcut("within(mainproject33.global.security.service..*)")
    private void inSecurity() {}

    @Pointcut("anyPublicOperation() &&" +
            "( inMatchBoard() || inGameDB() || inComment() || inMember() || inUserBoard() || inSecurity() )")
    private void cut() {}

    @Before("cut()")
    public void beforeParameterLogging(JoinPoint joinPoint) {
        Method method = getMethod(joinPoint);
        log.info("======= method name : {} =======", method.getName());

        Object[] args = joinPoint.getArgs();
        if (args.length == 0) {
            log.info("no parameter");
        } else {
            for (Object arg : args) {
                if (arg == null) {
                    log.info("parameter is null");
                } else {
                    log.info("parameter type : {}", arg.getClass().getSimpleName());
                    log.info("parameter value : {}", arg);
                }
            }
        }
    }

    @AfterReturning(value = "cut()", returning = "returnObj")
    public void afterReturnLogging(JoinPoint joinPoint, Object returnObj) {
        Method method = getMethod(joinPoint);
        log.info("======= method name : {} =======", method.getName());

        if (returnObj == null) {
            log.info("return object is null");
        } else {
            log.info("return type : {}", returnObj.getClass().getSimpleName());
            log.info("return value : {}", returnObj);
        }
    }

    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }
}
