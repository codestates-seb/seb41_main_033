import styled from 'styled-components';
import dummyContents from '../data/dummyContents.json';

const ListWrap = styled.div`
  li {
    padding: 16px 24px;
    border-top: 1px solid var(--border-color);
    display: flex;
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin: auto 0;
    }
    .content_container {
      margin-left: 16px;
    }
    .content_title {
      font-size: var(--font-body2-size);
      color: var(--white);
    }
    .content_date {
      font-size: var(--font-caption-size);
    }
  }
`;

const ProfileContentList = () => {
  return (
    <ListWrap>
      <ul>
        {dummyContents.contents.map((content) => (
          <li key={content.id}>
            <img src={content.icon} alt="게임 아이콘" />
            <div className="content_container">
              <div className="content_title">{content.title}</div>
              <div className="content_date">
                {new Date(content.createdAt).toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ListWrap>
  );
};

export default ProfileContentList;
