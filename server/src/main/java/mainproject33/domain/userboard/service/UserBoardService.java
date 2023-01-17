package mainproject33.domain.userboard.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.boardfile.entity.UserBoardFile;
import mainproject33.domain.boardfile.service.UserBoardFileService;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.userboard.repository.UserBoardRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class UserBoardService
{
    private final UserBoardRepository userBoardRepository;

    private final UserBoardFileService boardFileService;

    public UserBoard postUserBoard(UserBoard request, Member member, MultipartFile file) throws IOException
    {

        if(file != null)
        {
            boardFileService.verifyContentType(file);
            UserBoardFile userBoardFile = boardFileService.storeFile(file);
            userBoardFile.addUserBoard(request);
        }

        UserBoard userBoard = userBoardRepository.save(request);

        userBoard.addMember(member);

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
    public Page<UserBoard> findAllUserBoards(Pageable pageable)
    {
        return userBoardRepository.findAll(pageable);
    }

    public void deleteOne(Long id)
    {
        verifyExistBoard(id);

        UserBoard userBoard = findUserBoard(id);

        if(userBoard.getUserBoardFile() != null)
        {
            boardFileService.deleteUploadFile(id);
        }

        userBoardRepository.deleteById(id);
    }

    private void verifyExistBoard(Long id)
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
