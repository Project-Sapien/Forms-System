import React from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Form from './pages/Form';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/:formid" element={<Form/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
