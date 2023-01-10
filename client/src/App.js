import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        {/* <Header />
        <Nav /> */}
        <Routes>
          {/* <Route path="/" element={<Matching/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path={`/:${user-id}`} element={<Profile />} />
          <Route path="/storyfriend" element={<Story />} />
          <Route path={`/:${user-id}/edit`} element={<Profile />} />
          <Route path={`/:${user-id}/:${board-id}`} element={<StoryDetail />} /> */}
          {/* <Route path="/storyall" element={<Story />} />
          <Route path={`/${board - id}`} element={<MatchingDetail />} />
          <Route path="/quit" element={<Quit />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
