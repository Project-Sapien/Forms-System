import React from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Form from './pages/Form';
import UserView from './components/UserView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/:formId" element={<Form />} />
          <Route path="/userview/:formId" element={<UserView/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
