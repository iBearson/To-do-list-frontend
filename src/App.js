import React, { useState } from 'react';
import './App.css';
import Appbar from './components/Appbar';
import User from './components/User';
import Dashboard from './components/Dashboard'; // Import Dashboard component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // In parent component
  const [dueDate, setDueDate] = useState('');

  return (
    <Router>
      <div className="App">
        <Appbar />
        <Routes> {/* Replace Switch with Routes */}
          <Route path="/" element={<User dueDate={dueDate} setDueDate={setDueDate} />} exact /> {/* Update Route to use `element` prop */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Update Route to use `element` prop */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
