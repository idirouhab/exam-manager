import React from "react";
import routes from "../routes"
import {Route, Switch} from "react-router";


export default class Public extends React.Component {
    render() {
        return (
            <div className="wrapper">

                <div className="main-panel">
                    <Switch>
                        {routes.map((prop, key) => {
                            return (
                                <Route
                                    path={prop.section + prop.path}
                                    component={prop.component}
                                    key={key}
                                />
                            );
                        })}
                    </Switch>
                </div>
            </div>
        );
    }
}