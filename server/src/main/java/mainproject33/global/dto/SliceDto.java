package mainproject33.global.dto;

import lombok.Data;
import org.springframework.data.domain.Slice;

import java.util.List;

@Data
public class SliceDto<T>
{
    private List<T> data;

    private SliceInfo sliceInfo;

    public SliceDto(List<T> data, Slice slice)
    {
        this.data = data;
        this.sliceInfo = new SliceInfo(slice.getSize(),
                slice.hasNext(), slice.getNumber(), slice.getNumberOfElements());
    }
}
