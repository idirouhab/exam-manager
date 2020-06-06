import React from "react";
import { Route, Switch } from "react-router";
import routes from "../routes";
import SideBar from "../components/SideBar/SideBard";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import ButtonAppBar from "../components/ButtonAppBar/ButtonAppBar";
import CssBaseline from "@material-ui/core/CssBaseline";

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

export default function Private(props) {
    const {window} = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const theme = createMuiTheme({
        palette: {
            type: "light"
        },
    });
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <div className={classes.wrapper}>
                <SideBar
                    {...props}
                    routes={routes}
                    container={container}
                    theme={theme}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                />
                <ButtonAppBar
                    handleDrawerToggle={handleDrawerToggle}
                    theme={theme}
                />
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
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
                </main>
            </div>
        </MuiThemeProvider>
    );
}

