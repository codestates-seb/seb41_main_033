package mainproject33.domain.boardfile;

import lombok.RequiredArgsConstructor;
import mainproject33.global.dto.MultiResponseDto;
import mainproject33.global.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api/boards")
@RequiredArgsConstructor
@RestController
public class UserBoardFileController
{
    private final UserBoardFileService fileService;

    private final UserBoardFileMapper fileMapper;
    @PostMapping("/files")
    public ResponseEntity uploadFile(@RequestParam MultipartFile file)
    {
        try
        {
            UserBoardFile userBoardFile = fileService.storeFile(file);
            UserBoardFileResponse response = fileMapper.userBoardFileToResponse(userBoardFile);

            return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
        }
        catch (IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/multi/files")
    public ResponseEntity uploadMultiFiles(@RequestParam List<MultipartFile> files)
    {
        try
        {
            List<UserBoardFile> userBoardFiles = fileService.storeFiles(files);

            List<UserBoardFileResponse> response = fileMapper.userBoardFileToResponses(userBoardFiles);

            return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);

        } catch (IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
