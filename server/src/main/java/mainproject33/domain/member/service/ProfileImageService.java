package mainproject33.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.domain.member.entity.Profile;
import mainproject33.domain.member.entity.ProfileImage;
import mainproject33.domain.member.repository.ProfileImageRepository;
import mainproject33.global.exception.ExceptionMessage;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
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
        String fileName = UUID.randomUUID().toString();

        saveDefaultImageFile(fileName); // 이미지 파일 로컬에 저장

        ProfileImage profileImage = saveImageData(new ProfileImage(), fileName, defaultExtension); // 이미지 데이터 DB 에 저장
        profile.setImage(profileImage);

        return imageRepository.save(profileImage);
    }

    public ProfileImage updateProfileImage(Profile findProfile, String base64EncodedFile) { // 프로필 이미지 수정
        deleteImageFile(findProfile.getId()); // 기존 이미지 파일 삭제

        String fileName = UUID.randomUUID().toString();
        String extension = parseFileExtension(base64EncodedFile);

        byte[] imageByte = Base64.decodeBase64(base64EncodedFile); // patch 로 받은 base64EncodedFile 을 바이트 배열로 디코딩

        saveImageFile(fileName, extension, imageByte); // 이미지 파일 로컬에 저장

        ProfileImage profileImage = saveImageData(findProfile.getImage(), fileName, extension); // 이미지 데이터 DB 에 저장

        return imageRepository.save(profileImage);
    }

    public Resource readProfileImage(Long id) { // 프로필 이미지 가져오기
        ProfileImage image = imageRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException(ExceptionMessage.IMAGE_DATA_NOT_FOUND.get()));

        Resource resource = new FileSystemResource(
                filePath + image.getFileName() + image.getExtension());

        if (!resource.exists()) throw new NoSuchElementException(ExceptionMessage.FILE_NOT_FOUND.get());

        return resource;
    }

    private void saveDefaultImageFile(String fileName) { // 기본 프로필 이미지 파일 저장
        Resource resource = new FileSystemResource(
                filePath + defaultFileName + defaultExtension);
        try {
            File file = resource.getFile();
            File copy = new File(filePath + fileName + defaultExtension);
            Files.copy(file.toPath(), copy.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.warn("IOException happened", e);
        }
    }

    private void saveImageFile(String fileName, String extension, byte[] imageByte) {
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(filePath + fileName + extension);
            fileOutputStream.write(imageByte);
            fileOutputStream.close();
        } catch (IOException e) {
            log.warn("IOException happened", e);
        }
    }

    private ProfileImage saveImageData(ProfileImage profileImage, String fileName, String extension) {
        profileImage.setFileName(fileName);
        profileImage.setExtension(extension);

        return profileImage;
    }

    private void deleteImageFile(Long memberId) {
        ProfileImage findImage = findVerifiedImage(memberId);
        File file = new File(filePath + findImage.getFileName() + findImage.getExtension());
        file.delete();
    }

    public ProfileImage findVerifiedImage(Long memberId) {
        Optional<ProfileImage> optionalImage = imageRepository.findById(memberId);
        ProfileImage findImage = optionalImage.orElseThrow(() -> new RuntimeException("프로필 이미지를 찾을 수 없습니다."));

        return findImage;
    }

    private String parseFileExtension(String base64EncodedFile) { // base64EncodedFile 확장자 Parser. TODO : 추가 확장자 확인 필요
        switch (base64EncodedFile.charAt(0)) {
            case '/' : return ".jpeg";
            case 'i' : return ".png";
            case 'R' : return ".gif";
            case 'U' : return ".webp";
            case 'J' : return ".pdf";
        }
        throw new RuntimeException("올바른 확장자가 아닙니다.");
    }
}