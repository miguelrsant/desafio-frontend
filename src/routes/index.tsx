import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';

import Home from '../pages/Home';

import Characters from '../pages/Characters';
import CharacterDetails from '../pages/Characters/Details';

import Episodes from '../pages/Episodes';
import EpisodeDetails from '../pages/Episodes/Details';

import Locations from '../pages/Locations';
import LocationDetails from '../pages/Locations/Details';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />

          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:id" element={<EpisodeDetails />} />

          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:id" element={<LocationDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
