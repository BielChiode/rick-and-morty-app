import { BrowserRouter, Route, Routes } from 'react-router';
import CharacterList from './pages/CharacterList';
import CharacterDetails from './pages/CharacterDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character-details/:id" element={<CharacterDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
