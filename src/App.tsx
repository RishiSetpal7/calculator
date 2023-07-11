import './App.css';
import Calculator from './component/calculator';
import RecentHistory from './component/RecentHistory';
import { LightModeProvider } from './component/lightModeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LightModeProvider>
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/recentHistory" element={<RecentHistory />} />
            <Route path="*" element={<Calculator />} />
          </Routes>
        </LightModeProvider>
      </BrowserRouter>
    </div>
  );
}
