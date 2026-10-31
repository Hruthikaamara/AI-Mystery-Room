import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreateMystery from './pages/CreateMystery.jsx';
import InvestigationRoom from './pages/InvestigationRoom.jsx';
import Verdict from './pages/Verdict.jsx';
import Result from './pages/Result.jsx';

export default function App() {
  return <Routes><Route path="/" element={<Home />} /><Route path="/create" element={<CreateMystery />} /><Route path="/investigation/:id" element={<InvestigationRoom />} /><Route path="/investigation/:id/verdict" element={<Verdict />} /><Route path="/investigation/:id/result" element={<Result />} /><Route path="*" element={<Home />} /></Routes>;
}
