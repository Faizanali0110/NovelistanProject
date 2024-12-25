// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NovelLandingPage from "./pages/NovelLandingPage";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthorHandling from './Author/AuthorHandling';
import NotFoundPage from './NotFoundPage';
import CustomerHandling from './Customer/CustomerHandling'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NovelLandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/AuthorHandling/*" element={<AuthorHandling />} />
        <Route path="/CustomerHandling/*" element={<CustomerHandling />} /> {/* Corrected typo */}
        <Route path="*" element={<NotFoundPage/>} /> {/* Fallback */}
      </Routes>
    </Router>
  );
};

export default App;
