import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {createBrowserHistory} from "history";
import {Route, Router, Switch} from "react-router-dom";
import {Redirect} from "react-router";
import PublicSection from "./sections/Public";
import PrivateSection from "./sections/Private";
import "assets/main.scss";
import 'typeface-roboto';
import Auth from './providers/auth';

import './i18n';

const hist = createBrowserHistory();
dotenv.config();
console.log(dotenv)
const PrivateRoute = ({render: Component, ...rest}) => {
    return <Route {...rest} render={(props) => (
        Auth.isAuthenticated() === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/public/login',
                state: {
                    from: props.location
                }
            }}/>
    )}/>
};


ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <PrivateRoute path={"/admin"} render={props => <PrivateSection {...props} />}/>
            <Route path={"/public"} render={props => <PublicSection {...props} />}/>
            <Route exact path="/">
                {Auth.isAuthenticated() === true ? <Redirect to="/admin/home"/> : <Redirect to="/public/login"/>}
            </Route>
        </Switch>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
