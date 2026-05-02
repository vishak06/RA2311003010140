import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllNotifications from './pages/AllNotifications';
import PriorityInbox from './pages/PriorityInbox';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<AllNotifications />} />
        <Route path="/priority" element={<PriorityInbox />} />
      </Routes>
    </Router>
  );
}

export default App;
