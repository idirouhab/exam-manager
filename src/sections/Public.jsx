import React from "react";
import routes from "../routes";
import { Route, Switch } from "react-router";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: { main: "#2e3353" },
  },
});
export default function Public () {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
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
    </MuiThemeProvider>
  );
}
