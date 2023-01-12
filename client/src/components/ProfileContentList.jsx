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
    .match_game {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin: auto 0;
    }
    .content_container {
      width: 100%;
      line-height: var(--line-height-lg);
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
      display: flex;
      align-items: center;
      margin-left: 16px;
      img {
        width: 56px;
        height: 56px;
        border-radius: 4px;
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
                <img
                  className="match_game"
                  src={content.icon}
                  alt="게임 아이콘"
                />
                <div className="content_container">
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
                <div className="content_container">
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
