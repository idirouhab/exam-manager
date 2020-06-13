import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import routes from "../routes";
import SideBar from "../components/SideBar/SideBard";
import { makeStyles } from "@material-ui/core/styles";
import ButtonAppBar from "../components/ButtonAppBar/ButtonAppBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AutoRotatingCarouselModal from "../components/Common/OnBoarding";
import CookiesProvider from "../providers/cookies";

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
const COOKIE_KEY = "onboarding";
export default function Private (props) {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [onBoardOpen, setOnBoardOpen] = useState(false);

  useEffect(() => {
    if (!CookiesProvider.get(COOKIE_KEY)) {
      setOnBoardOpen(true);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const cookiesOnBoarding = () => {
    CookiesProvider.save("onboarding", true);
    setOnBoardOpen(false);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <div className={classes.wrapper}>
      <AutoRotatingCarouselModal
        isMobile={matches}
        open={onBoardOpen}
        setOnBoardOpen={setOnBoardOpen}
        cookiesOnBoarding={cookiesOnBoarding}
      />
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
