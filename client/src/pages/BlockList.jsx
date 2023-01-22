import styled from 'styled-components';
import BlockUserList from '../components/BlockUserList';

const BlockWrap = styled.div`
  width: 100%;
  padding: 48px 0;
`;

const TitleWrap = styled.div`
  padding: 0 48px 48px 48px;
  .title {
    font-size: var(--font-head2-size);
  }
`;

const BlockList = () => {
  return (
    <BlockWrap className="card">
      <TitleWrap>
        <div className="title">차단한 유저 목록</div>
      </TitleWrap>
      <BlockUserList />
    </BlockWrap>
  );
};

export default BlockList;
