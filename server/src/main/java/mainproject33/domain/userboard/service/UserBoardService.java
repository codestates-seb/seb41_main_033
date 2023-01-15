package mainproject33.domain.userboard.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.boardfile.UserBoardFile;
import mainproject33.domain.boardfile.UserBoardFileService;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.userboard.repository.UserBoardRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class UserBoardService
{
    private final UserBoardRepository userBoardRepository;

    private final UserBoardFileService boardFileService;

    public UserBoard postUserBoard(UserBoard request, Member member, List<MultipartFile> files) throws IOException
    {
        List<UserBoardFile> userBoardFiles = boardFileService.storeFiles(files);

        UserBoard userBoard = userBoardRepository.save(request);

        userBoard.addMember(member);

        for (UserBoardFile userBoardFile : userBoardFiles)
        {
            userBoardFile.addUserBoard(request);
        }

        return userBoard;
    }

    public UserBoard patchUserBoard(UserBoard request)
    {
        UserBoard findBoard = findUserBoard(request.getId());

        Optional.ofNullable(request.getContent())
                .ifPresent(findBoard::updateContent);

        return findBoard;
    }

    @Transactional(readOnly = true)
    public UserBoard findUserBoard(Long id)
    {
        Optional<UserBoard> optionalBoard = userBoardRepository.findById(id);

        UserBoard findBoard = optionalBoard.orElseThrow(() -> new BusinessLogicException(ExceptionMessage.USER_BOARD_NOT_FOUND));

        return findBoard;
    }

    @Transactional(readOnly = true)
    public Page<UserBoard> findAllUserBoards(int page, int size)
    {
        return userBoardRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
    }


    public void deleteOne(Long id)
    {
        verifyExistBoard(id);

        userBoardRepository.deleteById(id);
    }

    public void verifyExistBoard(Long id)
    {
        Optional<UserBoard> findBoard = userBoardRepository.findById(id);

        if(findBoard.isEmpty())
        {
            throw new BusinessLogicException(ExceptionMessage.USER_BOARD_NOT_FOUND);
        }
    }

    public void verifyMember(Member member, long id)
    {
        UserBoard userBoard = findUserBoard(id);

        if(userBoard.getMember().getId() != member.getId())
        {
            throw new BusinessLogicException(ExceptionMessage.MEMBER_UNAUTHORIZED);
        }
    }
}
