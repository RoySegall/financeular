import React from 'react';
import './styles/tailwind.css';
import {FrontPage} from "./Pages/FrontPage";
import {General} from "./Layout/General";

function App() {
  return (
    <div className="App">
      <General>
        <FrontPage />
      </General>
    </div>
  );
}

export default App;
