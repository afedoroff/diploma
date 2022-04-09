import React from 'react';
import { render } from "react-dom";
import './App.css';

export default function App() {
  return (
      <div>
        <h1>Hello</h1>
      </div>
  );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);