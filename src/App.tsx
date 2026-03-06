import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import Register from './pages/Register';
import Transaction from './pages/Transaction';
import MyPage from './pages/MyPage';
import BrowseGames from './pages/BrowseGames';
import GameListings from './pages/GameListings';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transaction/:id" element={<Transaction />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/browse" element={<BrowseGames />} />
        <Route path="/listings/:gameId" element={<GameListings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
