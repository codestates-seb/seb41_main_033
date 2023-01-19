package mainproject33.domain.boardfile.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.domain.boardfile.entity.UserBoardFile;
import mainproject33.domain.boardfile.repository.UserBoardFileRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class UserBoardFileService
{
    private final UserBoardFileRepository fileRepository;

    private final String bucket = "gameto";
    private final AmazonS3 amazonS3;

    public UserBoardFile storeFile(MultipartFile multipartFile) throws IOException
    {
        //image.png
        String uploadFilename = multipartFile.getOriginalFilename();

        String storeFileName = createStoreFileName(uploadFilename);

        saveUploadFile(storeFileName, multipartFile);

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

        return ext;
    }

    private void saveUploadFile(String storeFileName, MultipartFile file)
    {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        try
        {
            amazonS3.putObject(bucket, "StoryFiles/" + storeFileName, file.getInputStream(), metadata);
        }
        catch (IOException e)
        {
            log.warn("IOException happened", e);
        }
    }

    public String verifyContentType(MultipartFile file)
    {
        String ext = file.getContentType();

        if (!ext.contains("image") && !ext.contains("video"))
            throw new BusinessLogicException(ExceptionMessage.EXT_NOT_ACCEPTED);

        return ext;
    }

    public void deleteUploadFile(long boardId)
    {
        UserBoardFile userBoardFile = verifyFile(boardId);
        amazonS3.deleteObject(bucket, "StoryFiles/" + userBoardFile.getStoreFileName());
    }

    private UserBoardFile verifyFile(long boardId)
    {
        return fileRepository.findByUserBoardId(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionMessage.FILE_NOT_FOUND));
    }

    public String readUserBoardFilePath(long boardId)
    {
        Optional<UserBoardFile> findUserBoardFile = fileRepository.findByUserBoardId(boardId);
        if(findUserBoardFile.isEmpty())
            return null;

        UserBoardFile userBoardFile = findUserBoardFile.get();

        String storeFileName = userBoardFile.getStoreFileName();

        return amazonS3.getUrl(bucket, "StoryFiles/" + storeFileName).toString();
    }
}
