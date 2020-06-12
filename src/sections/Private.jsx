import React from "react";
import { Route, Switch } from "react-router";
import routes from "../routes";
import SideBar from "../components/SideBar/SideBard";
import { makeStyles } from "@material-ui/core/styles";
import ButtonAppBar from "../components/ButtonAppBar/ButtonAppBar";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  wrapper: {
    display: "flex",
  }
}));

export default function Private (props) {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.wrapper}>
      <SideBar
        {...props}
        routes={routes}
        container={container}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <ButtonAppBar
        handleDrawerToggle={handleDrawerToggle}
      />
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Switch>
          {/* eslint-disable-next-line array-callback-return */}
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
      </main>
    </div>
  );
}
