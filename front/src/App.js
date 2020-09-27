import React, {useState} from 'react';
import './styles/tailwind.css';
import FrontPage from "./Pages/FrontPage";
import General from "./Layout/General";
import Login from "./Pages/Login/Login";
import Results from "./Pages/Results";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./app.scss"
import { ApolloProvider } from '@apollo/client';
import {client} from "./client";
function App() {

    return <ApolloProvider client={client}>
        <div className="App">
        <Router>
            <General>
                <Switch>
                    <Route path="/login"><Login/></Route>
                    <Route path="/results"><Results/></Route>
                    <Route path="/"><FrontPage/></Route>
                </Switch>
            </General>
        </Router>
    </div>
    </ApolloProvider>;
}

export default App;
