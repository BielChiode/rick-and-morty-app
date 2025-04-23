import { BrowserRouter, Route, Routes } from "react-router";
import CharacterList from "./pages/CharacterList";
import CharacterDetails from "./pages/CharacterDetails";
import NotFound from "./pages/NotFound";
import LocationList from "./pages/LocationList";
import LocationDetails from "./pages/LocationDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character-details/:id" element={<CharacterDetails />} />
        <Route path="/location-details/:id" element={<LocationDetails />} />
        <Route path="/locations" element={<LocationList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
