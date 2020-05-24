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
import {SnackbarProvider} from "notistack";

const hist = createBrowserHistory();
dotenv.config();

const PrivateRoute = ({render: Component, ...rest}) => {
    return <Route {...rest} render={(props) => (
        Auth.isAuthenticated()  === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: {
                    from: props.location
                }
            }}/>
    )}/>
};

const RootRoute = ({render: Component, ...rest}) => {
    return <Route {...rest} render={(props) => (
        Auth.isRoot() === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: {
                    from: props.location
                }
            }}/>
    )}/>
};

ReactDOM.render(
    <SnackbarProvider maxSnack={1} preventDuplicate={true} dense>
        <Router history={hist}>
            <Switch>
                <Route exact path="/">
                    {Auth.isAuthenticated() === true ? <Redirect to="/admin/home"/> : <Redirect to="/login"/>}
                </Route>
                <PrivateRoute path={"/admin"} render={props => <PrivateSection {...props} />}/>
                <RootRoute path={"/root"} render={props => <RootRoute {...props} />}/>
                <Route path={"/"} render={props => <PublicSection {...props} />}/>
            </Switch>
        </Router>
    </SnackbarProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
