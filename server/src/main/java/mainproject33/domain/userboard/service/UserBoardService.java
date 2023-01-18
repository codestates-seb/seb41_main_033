package mainproject33.domain.userboard.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.boardfile.entity.UserBoardFile;
import mainproject33.domain.boardfile.service.UserBoardFileService;
import mainproject33.domain.member.entity.Member;
import mainproject33.domain.member.repository.BlockRepository;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.userboard.repository.UserBoardRepository;
import mainproject33.global.exception.BusinessLogicException;
import mainproject33.global.exception.ExceptionMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class UserBoardService
{
    private final UserBoardRepository userBoardRepository;

    private final BlockRepository blockRepository;
    private final UserBoardFileService boardFileService;

    public UserBoard postUserBoard(UserBoard request, Member member, MultipartFile file) throws IOException
    {

        if(file != null)
        {
            String contentType = boardFileService.verifyContentType(file);
            UserBoardFile userBoardFile = boardFileService.storeFile(file);
            userBoardFile.addContentType(contentType);
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
    public UserBoard getUserBoard(Long id, Member member)
    {
        Optional<UserBoard> optionalBoard = userBoardRepository.findById(id);

        UserBoard findBoard = optionalBoard.orElseThrow(() -> new BusinessLogicException(ExceptionMessage.USER_BOARD_NOT_FOUND));

        if(member == null)
            return findBoard;

        //멤버가 있을 경우 들
        List<Long> blackList = getBlackList(member.getId());

        if(blackList.contains(findBoard.getMember().getId()))
            throw new BusinessLogicException(ExceptionMessage.USER_BOARD_NOT_FOUND);

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
    public Page<UserBoard> findAllBoards(String keyword, Pageable pageable, Member member)
    {
        if(member == null) //비 로그인일 경우
        {
            if(keyword == null) return userBoardRepository.findAll(pageable);

            return getPagedBoard(userBoardRepository.findByKeyword(keyword), pageable);
        }

        //로그인 한 유저 일 경우

        List<Long> blockList = getBlackList(member.getId());

        if(keyword == null)
        {
            List<UserBoard> boards = userBoardRepository.findAll();
            List<UserBoard> filteredUserBoards = filterUserBoard(blockList, boards);

            return getPagedBoard(filteredUserBoards, pageable);
        }

        List<UserBoard> boards = userBoardRepository.findByKeyword(keyword);

        List<UserBoard> filteredUserBoards = filterUserBoard(blockList, boards);

        Page<UserBoard> pagedBoard = getPagedBoard(filteredUserBoards, pageable);

        return pagedBoard;
    }


    public Page<UserBoard> findProfileUserBoards(Long memberId, Pageable pageable) {
        return userBoardRepository.findByMemberId(memberId, pageable);
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

    //로그인한 멤버 정보
    public void verifyMember(Member member, long id)
    {
        UserBoard userBoard = findUserBoard(id);

        if(userBoard.getMember().getId() != member.getId())
        {
            throw new BusinessLogicException(ExceptionMessage.MEMBER_UNAUTHORIZED);
        }
    }

    //========블랙 리스트 관련 기능들========//
    private List<Long> getBlackList(Long blockerId)
    {
        List<Long> blockList = blockRepository.findBlockedIdByBlockerId(blockerId);

        return blockList;
    }

    private Page<UserBoard> getPagedBoard(List<UserBoard> boards, Pageable pageable)
    {
        int start = (int)pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), boards.size());
        Page<UserBoard> page = new PageImpl<>(boards.subList(start, end), pageable, boards.size());

        return page;
    }

    private List<UserBoard> filterUserBoard(List<Long> blockList, List<UserBoard> boards)
    {
        return boards.stream()
                .filter(userBoard -> !blockList.contains(userBoard.getMember().getId()))
                .collect(Collectors.toList());
    }
}
