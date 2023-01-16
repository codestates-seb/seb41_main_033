package mainproject33.domain.boardfile.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.boardfile.entity.UserBoardFile;
import mainproject33.domain.boardfile.repository.UserBoardFileRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Transactional
@RequiredArgsConstructor
@Service
public class UserBoardFileService
{
    private final UserBoardFileRepository fileRepository;

    @Value("${file.dir}")
    private String fileDir;

    public String getFullPath(String filename)
    {
        return fileDir + filename;
    }

    public UserBoardFile storeFile(MultipartFile multipartFile) throws IOException
    {

        //image.png
        String uploadFilename = multipartFile.getOriginalFilename();

        String storeFileName = createStoreFileName(uploadFilename);

        multipartFile.transferTo(new File(getFullPath(storeFileName)));

        UserBoardFile boardFile = UserBoardFile
                .builder()
                .uploadFileName(uploadFilename)
                .storeFileName(storeFileName)
                .build();

        return fileRepository.save(boardFile);
    }

    public List<UserBoardFile> storeFiles(List<MultipartFile> files) throws IOException
    {
        List<UserBoardFile> storeFileResult = new ArrayList<>();
        for (MultipartFile file : files)
        {
            UserBoardFile userBoardFile = storeFile(file);
            storeFileResult.add(userBoardFile);
        }
        return storeFileResult;
    }

    public void deleteByUserBoardId(long userBoardId)
    {
        fileRepository.deleteByUserBoardId(userBoardId);
    }


    private String createStoreFileName(String originalFilename)
    {
        //서버에 저장하는 파일 명
        //ex) "qwe-qwe-123-123-qwe"
        String uuid = UUID.randomUUID().toString();

        String ext = extracted(originalFilename);

        //랜덤 문자열 + 확장자 명
        return uuid + "." + ext;
    }

    private String extracted(String originalFilename)
    {
        int num = originalFilename.lastIndexOf(".");

        //확장자 명 추출
        String ext = originalFilename.substring(num + 1);

        List<String> extList = new ArrayList<>();
        extList.add("jpg");
        extList.add("jpeg");
        extList.add("png");

        if(!extList.contains(ext))
            throw new BusinessLogicException(ExceptionMessage.EXT_NOT_ACCEPTED);

        return ext;
    }
}
