import React from "react";
import routes from "../routes";
import { Route, Switch } from "react-router";

export default function Public () {
  return (
    <div className="wrapper public-full" style={{ margin: "0" }}>
      <div className="main-panel public-full">
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
