package mainproject33.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.domain.member.entity.Profile;
import mainproject33.domain.member.entity.ProfileImage;
import mainproject33.domain.member.repository.ProfileImageRepository;
import mainproject33.global.exception.ExceptionMessage;
import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
@Service
@Slf4j
@RequiredArgsConstructor
public class ProfileImageService {
    private final ProfileImageRepository imageRepository;
    private final String filePath = "C:\\Users\\PC\\Desktop\\git\\seb41_main_033\\server\\src\\main\\resources\\memberImages\\"; // TODO : 실제 서버 filePath 로 수정 필요
    private final String defaultFileName = "defaultImage";
    private final String defaultExtension = ".png";

    public ProfileImage createDefaultProfileImage(Profile profile) { // 기본 프로필 이미지 생성
        String uploadFileName = defaultFileName + defaultExtension;
        String storeFileName = UUID.randomUUID() + defaultExtension;

        saveDefaultImageFile(storeFileName); // 이미지 파일 로컬에 저장

        ProfileImage profileImage = saveImageData(new ProfileImage(), uploadFileName, storeFileName); // 이미지 데이터 DB 에 저장
        profile.setImage(profileImage);

        return imageRepository.save(profileImage);
    }

    public ProfileImage updateProfileImage(Profile findProfile, MultipartFile file) { // 프로필 이미지 수정
        deleteImageFile(findProfile.getId()); // 기존 이미지 파일 삭제

        String uploadFileName = file.getOriginalFilename();
        String storeFileName = UUID.randomUUID() + parseFileExtension(file);

        saveImageFile(storeFileName, file); // 이미지 파일 로컬에 저장

        ProfileImage profileImage = saveImageData(
                findProfile.getImage(), uploadFileName, storeFileName); // 이미지 데이터 DB 에 저장

        return imageRepository.save(profileImage);
    }

    public Resource readProfileImage(Long id) { // 프로필 이미지 가져오기
        ProfileImage image = imageRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException(ExceptionMessage.IMAGE_DATA_NOT_FOUND.get()));

        Resource resource = new FileSystemResource(
                filePath + image.getStoreFileName());

        if (!resource.exists()) throw new NoSuchElementException(ExceptionMessage.FILE_NOT_FOUND.get());

        return resource;
    }

    private void saveDefaultImageFile(String storeFileName) { // 기본 프로필 이미지 파일 저장
        Resource resource = new FileSystemResource(filePath + defaultFileName + defaultExtension);
        try {
            File file = resource.getFile();
            File copy = new File(filePath + storeFileName);
            Files.copy(file.toPath(), copy.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.warn("IOException happened", e);
        }
    }

    private void saveImageFile(String fileName, MultipartFile file) {
        try {
            String savedPath = filePath + fileName;
            File path = new File(savedPath); // 파일 저장될 경로 설정
            file.transferTo(path); // @RequestPart로 받은 file을 지정 경로에 저장
        } catch (IOException e) {
            log.warn("IOException happened", e);
        }
    }

    private ProfileImage saveImageData(ProfileImage profileImage, String uploadFileName, String storeFileName) {
        profileImage.setUploadFileName(uploadFileName);
        profileImage.setStoreFileName(storeFileName);

        return profileImage;
    }

    private void deleteImageFile(Long memberId) {
        ProfileImage findImage = findVerifiedImage(memberId);
        File file = new File(filePath + findImage.getStoreFileName());
        file.delete();
    }

    public ProfileImage findVerifiedImage(Long memberId) {
        Optional<ProfileImage> optionalImage = imageRepository.findById(memberId);
        ProfileImage findImage = optionalImage.orElseThrow(() -> new RuntimeException("프로필 이미지를 찾을 수 없습니다."));

        return findImage;
    }

    private String parseFileExtension(MultipartFile file) { // base64EncodedFile 확장자 Parser. TODO : 추가 확장자 확인 필요
        return "." + FilenameUtils.getExtension(file.getOriginalFilename());
    }
}