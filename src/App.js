import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import TestPage from './pages/TestPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <div id="app">
      <Header /> {/* Header는 항상 렌더링 */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;