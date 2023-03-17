import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectListPage from 'pages/ProjectListPage';
import LoginPage from 'pages/LoginPage';

function App() {
  return (
    <div className="App">
      <LoginPage/>
      <ProjectListPage/>
    </div>
  );
}

export default App;
