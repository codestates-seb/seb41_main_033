import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import MatchingWrite from "./pages/MatchingWrite";
import Story from "./pages/Story";
import Matching from "./pages/Matching";
import MatchingDetail from "./pages/MatchingDetail";
import Profile from "./pages/Profile";
import StoryDetail from "./pages/StoryDetail";
import Signup from "./pages/Signup";
import Quit from "./pages/Quit";
import StoryWrite from "./pages/StoryWrite";

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
							<Route path="/login" element={<Login />} />
							<Route path="/matchwrite" element={<MatchingWrite />} />
							<Route path="/" element={<Matching />} />
							<Route path="/story" element={<Story />} />
							<Route path="/userid" element={<Profile />} />
							<Route path="/boardid" element={<MatchingDetail />} />
							<Route path="/storyid" element={<StoryDetail />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/quit" element={<Quit />} />
							<Route path="/storywrite" element={<StoryWrite />} />
						</Routes>
					</main>
				</MainWrap>
			</Router>
		</Wrap>
	);
};

export default App;
