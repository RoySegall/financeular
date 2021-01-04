import React from 'react';
import FrontPage from "./Pages/FrontPage/FrontPage";
import General from "./Layout/General";
import Login from "./Pages/Login/Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './index.scss';
import "./app.scss"
import { ApolloProvider } from '@apollo/client';
import {client} from "./client";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Logout from "./Pages/Logout";
import Upload from "./Pages/Upload/Upload";
import File from "./Pages/Files/File";

function App() {

    return <ApolloProvider client={client}>
        <div className="App">
            <Router>
                <General>
                    <Switch>
                        <Route path="/login"><Login/></Route>
                        <Route path="/logout"><Logout/></Route>
                        <Route path="/dashboard/file/view/:id"><File /></Route>
                        <Route path="/dashboard"><Dashboard/></Route>
                        <Route path="/upload"><Upload/></Route>
                        <Route path="/"><FrontPage/></Route>
                    </Switch>
                </General>
            </Router>
        </div>
    </ApolloProvider>;
}

export default App;
