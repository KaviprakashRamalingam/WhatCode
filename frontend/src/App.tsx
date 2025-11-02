import React from 'react';
import './styles/App.css';
import CodeVisualizer from './components/CodeVisualizer/CodeVisualizer';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="app-header">
        <h1>WhatCode</h1>
        <p>Visualize your code execution step by step</p>
      </header>
      <main className="app-main">
        <CodeVisualizer />
      </main>
    </div>
  );
};

export default App;

