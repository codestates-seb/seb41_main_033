package mainproject33.global.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SliceInfo
{

    private int size;

    private boolean hasNext;

    private int sliceNumber;
    private int numberOfElements;

}
