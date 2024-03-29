import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Matching from './pages/Matching';
import MatchingDetail from './pages/MatchingDetail';
import MatchingWrite from './pages/MatchingWrite';
import MatchingEdit from './pages/MatchingEdit';
import Story from './pages/Story';
import StoryDetail from './pages/StoryDetail';
import StoryWrite from './pages/StoryWrite';
import StoryEdit from './pages/StoryEdit';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import BlockList from './pages/BlockList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Quit from './pages/Quit';
import GameRecommend from './pages/GameRecommend';
import Readme from './pages/Readme';
import { MOBILE_POINT } from './data/breakpoint';
import Email from './pages/Email';

const Wrap = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  background: var(--bg-color);
`;

const MainWrap = styled.section`
  display: flex;
  flex: 1;
  position: relative;
  padding: 112px 0 0 0;
  width: calc(100% - 200px);
  .container {
    width: 100%;
    max-width: 1040px;
    padding: 0 32px;
    margin: 48px auto 48px auto;
  }

  @media (max-width: ${MOBILE_POINT}) {
    padding: 56px 0 56px 0;
    width: 100%;
    .container {
      max-width: 100%;
      padding: 0 16px;
      margin: 24px auto 48px auto;
    }
  }
`;

const App = () => {
  return (
    <Wrap>
      <Router basename={process.env.PUBLIC_URL}>
        <Nav />
        <MainWrap>
          <Header />
          {/* 아래 main 안에 각 페이지가 들어갑니다. */}
          <main className="container">
            <Routes>
              {/* <Route path="/" element={<Matching />} /> */}
              <Route path="/match" element={<Matching />} />
              <Route
                path="/match/:boardid/detail"
                element={<MatchingDetail />}
              />
              <Route path="/match/matchwrite" element={<MatchingWrite />} />
              <Route path="/match/:boardid/edit" element={<MatchingEdit />} />
              <Route path="/story" element={<Story />} />
              <Route path="/story/:userid/:boardid" element={<StoryDetail />} />
              <Route
                path="/story/:userid/:boardid/edit"
                element={<StoryEdit />}
              />
              <Route path="/story/storywrite" element={<StoryWrite />} />
              <Route path="/profile/:userid" element={<Profile />} />
              <Route path="/profile/:userid/edit" element={<ProfileEdit />} />
              <Route path="/profile/:userid/block" element={<BlockList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/quit" element={<Quit />} />
              <Route path="/game" element={<GameRecommend />} />
              <Route path="/" element={<Readme />} />
              <Route path="/email" element={<Email />} />
            </Routes>
          </main>
        </MainWrap>
      </Router>
    </Wrap>
  );
};

export default App;
