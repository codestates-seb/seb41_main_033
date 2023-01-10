package mainproject33.domain.userboard.service;

import lombok.RequiredArgsConstructor;
import mainproject33.domain.userboard.entity.UserBoard;
import mainproject33.domain.userboard.repository.UserBoardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class UserBoardService
{
    private final UserBoardRepository userBoardRepository;


    public UserBoard postUserBoard(UserBoard request)
    {
        UserBoard userBoard = userBoardRepository.save(request);

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

        UserBoard findBoard = optionalBoard.orElseThrow(() -> new IllegalStateException("해당 글을 찾을 수 없습니다."));

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
            throw new IllegalStateException("존재하지 않는 게시글입니다.");
        }
    }
}
