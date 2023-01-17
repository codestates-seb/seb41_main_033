package mainproject33.domain.member.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject33.domain.member.entity.Profile;
import mainproject33.domain.member.entity.ProfileImage;
import mainproject33.domain.member.repository.ProfileImageRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;
@Service
@Slf4j
@RequiredArgsConstructor
public class ProfileImageService {
    private final ProfileImageRepository imageRepository;
    private final String bucket = "gameto";
    private final AmazonS3 amazonS3;

    public ProfileImage createDefaultProfileImage(Profile profile) { // 기본 프로필 이미지 생성

        ProfileImage profileImage = saveImageData(new ProfileImage(), null, null); // 이미지 데이터 DB 에 저장
        profile.setImage(profileImage);

        return imageRepository.save(profileImage);
    }

    public ProfileImage updateProfileImage(Profile findProfile, MultipartFile file) { // 프로필 이미지 수정
        deleteImageFile(findProfile.getId()); // 기존 이미지 파일 삭제
        ProfileImage profileImage;

        if (file != null && !file.isEmpty()) {
            String uploadFileName = file.getOriginalFilename();
            String storeFileName = UUID.randomUUID() + parseFileExtension(file);

            saveImageFile(storeFileName, file); // 이미지 파일 로컬에 저장

            profileImage = saveImageData(
                    findProfile.getImage(), uploadFileName, storeFileName); // 이미지 데이터 DB 에 저장
        } else {
            profileImage = saveImageData(
                    findProfile.getImage(), null, null);
        }

        return imageRepository.save(profileImage);
    }

    public String readProfileImagePath(Long id) { // 프로필 이미지 가져오기
        ProfileImage findImage = findVerifiedImage(id);
        String storeFileName = findImage.getStoreFileName();

        if (storeFileName == null) return null;
        else return amazonS3.getUrl(bucket, "ProfileImages/" + storeFileName).toString();
    }

    private void saveImageFile(String storeFileName, MultipartFile file) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        try {
            amazonS3.putObject(bucket, "ProfileImages/" + storeFileName, file.getInputStream(), metadata);
        } catch (IOException e) {
            log.warn("IOException happened", e);
        }
    }

    private ProfileImage saveImageData(ProfileImage profileImage, String uploadFileName, String storeFileName) {
        profileImage.setUploadFileName(uploadFileName);
        profileImage.setStoreFileName(storeFileName);

        return profileImage;
    }

    public void deleteImageFile(Long memberId) {
        ProfileImage findImage = findVerifiedImage(memberId);

        if (findImage.getStoreFileName() != null) {
            amazonS3.deleteObject(bucket, "ProfileImages/" + findImage.getStoreFileName());
        }
    }

    public ProfileImage findVerifiedImage(Long memberId) {
        return imageRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionMessage.IMAGE_DATA_NOT_FOUND));
    }

    private String parseFileExtension(MultipartFile file) { // base64EncodedFile 확장자 Parser. TODO : 추가 확장자 확인 필요
        return "." + FilenameUtils.getExtension(file.getOriginalFilename());
    }
}