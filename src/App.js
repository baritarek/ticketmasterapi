import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Results from './components/Results';
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import Attractions from './components/Attractions';
import AttractionDetails from './components/AttractionDetails';
import Venues from './components/Venues';
import VenueDetails from './components/VenueDetails';

function App() {
  return (
    <div className='App'>
      <Navbar />

      <div className='content'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/results' element={<Results />} />
            <Route path='/events' element={<Events />} />
            <Route path='/events/:id' element={<EventDetails />} />
            <Route path='/attractions' element={<Attractions />} />
            <Route path='/attractions/:id' element={<AttractionDetails />} />
            <Route path='/venues' element={<Venues />} />
            <Route path='/venues/:id' element={<VenueDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
