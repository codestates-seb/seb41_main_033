import styled from 'styled-components';
import { ReactComponent as Heart } from '../assets/heartIcon.svg';
import { ReactComponent as Comment } from '../assets/sms.svg';
import dummyMatchContents from '../data/dummyMatchContents.json';
import dummyStoryContents from '../data/dummyStoryContents.json';

const ListWrap = styled.div`
  li {
    padding: 16px 24px;
    border-top: 1px solid var(--border-color);
    display: flex;
    .game_container {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      overflow: hidden;
      margin: auto 0;
      margin-right: 16px;
      .game_icon {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content_container {
      line-height: var(--line-height-lg);
    }
    .match {
      width: 100%;
    }
    .story {
      width: calc(100% - 72px);
    }
    .content_title {
      font-size: var(--font-body2-size);
      color: var(--white);
    }
    .content_date {
      font-size: var(--font-caption-size);
    }
    .content_count {
      display: flex;
      padding-top: 12px;
      .content_like,
      .content_comment {
        display: flex;
        align-items: center;
        padding: 2px 8px;
        background: #282828;
        border-radius: var(--border-radius-btn);
        span {
          margin-left: 8px;
          font-size: var(--font-caption-size);
          color: #e8def8;
        }
      }
      .content_like {
        margin-right: 6px;
      }
    }
    .image_container {
      width: 56px;
      height: 56px;
      border-radius: 4px;
      overflow: hidden;
      margin: auto 0;
      margin-left: 16px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

const ProfileContentList = ({ isMatch, isStory }) => {
  return (
    <ListWrap>
      <ul>
        {isMatch
          ? dummyMatchContents.contents.map((content) => (
              <li key={content.id}>
                <div className="game_container">
                  <img
                    className="game_icon"
                    src={content.icon}
                    alt="게임 아이콘"
                  />
                </div>
                <div className="content_container match">
                  <div className="content_title">{content.title}</div>
                  <div className="content_date">
                    {new Date(content.createdAt).toLocaleString()}
                  </div>
                </div>
              </li>
            ))
          : null}
        {isStory
          ? dummyStoryContents.contents.map((content) => (
              <li key={content.id}>
                <div className="content_container story">
                  <div className="content_title">{content.title}</div>
                  <div className="content_date">
                    {new Date(content.createdAt).toLocaleString()}
                  </div>
                  <div className="content_count">
                    {content.likeCount ? (
                      <div className="content_like">
                        <Heart width="10px" />
                        <span>{content.likeCount}</span>
                      </div>
                    ) : null}
                    {content.commentCount ? (
                      <div className="content_comment">
                        <Comment width="10px" />
                        <span>{content.commentCount}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
                {content.content.contentImage ? (
                  <div className="image_container">
                    <img
                      src={content.content.contentImage}
                      alt="스토리 이미지"
                    />
                  </div>
                ) : null}
              </li>
            ))
          : null}
      </ul>
    </ListWrap>
  );
};

export default ProfileContentList;
