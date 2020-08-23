import React from 'react';
import './styles/tailwind.css';
import FrontPage from "./Pages/FrontPage";
import General from "./Layout/General";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="App">
      <General>
        {/*<FrontPage />*/}
        <Login />
      </General>
    </div>
  );
}

export default App;