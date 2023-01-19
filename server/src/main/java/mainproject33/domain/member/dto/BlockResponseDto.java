package mainproject33.domain.member.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class BlockResponseDto<T> {

    private List<T> data;
}
