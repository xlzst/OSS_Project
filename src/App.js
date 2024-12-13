import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import { Header } from './components/Header';
import TestPage from './pages/TestPage';

function App() {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route path="/" element={<MainPage/>} />
          <Route path="/detail/:id" element={<DetailPage/>} />
          <Route path="/test" element={<TestPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;