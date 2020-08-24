import React from 'react';
import './styles/tailwind.css';
import FrontPage from "./Pages/FrontPage";
import General from "./Layout/General";
import Login from "./Pages/Login";
import Results from "./Pages/Results";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
    return <div className="App">
        <General>
            <Router>
                <Switch>
                    <Route path="/login"><Login/></Route>
                    <Route path="/results"><Results/></Route>
                    <Route path="/"><FrontPage/></Route>
                </Switch>
            </Router>
        </General>
    </div>;
}

export default App;
