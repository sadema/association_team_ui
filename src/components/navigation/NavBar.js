import React, {Component, Fragment} from 'react';
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {IconButton} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import HomePage from "../home/HomePage";
import TeamPage from "../team/TeamPage";
import PlayerPage from "../player/PlayerPage";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolbarMargin: theme.mixins.toolbar
});

const TeamsToolbar = withStyles(styles)(
    class extends Component {
        static defaultProps = {
            MenuItems: () => (
                <>
                    <MenuItem component={Link} to="/teams">
                        Teams
                    </MenuItem>
                    <MenuItem component={Link} to="/players">
                        Players
                    </MenuItem>
                </>
            )
        };

        state = {anchor: null};

        closeMenu = () => this.setState({anchor: null});

        render() {
            const {classes, title, MenuItems} = this.props;

            return (
                <Fragment>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="Menu"
                                onClick={e =>
                                    this.setState({anchor: e.currentTarget})
                                }
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                anchorEl={this.state.anchor}
                                open={Boolean(this.state.anchor)}
                                onClose={this.closeMenu}>
                                <MenuItems/>
                            </Menu>
                            <Typography
                                variant="h5"
                                color="inherit"
                                className={classes.flex}
                            >
                                {title}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.toolbarMargin}/>
                </Fragment>
            );
        }
    }
);

export const NavBar = withStyles(styles)(({classes}) => {

    return (
        <Router>
            <div className={classes.root}>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <>
                            <TeamsToolbar title="Managing Teams"/>
                            <HomePage/>
                        </>
                    )}
                />
                <Route
                    path="/teams"
                    render={() => (
                        <>
                            <TeamsToolbar title="Managing Teams"/>
                            <TeamPage/>
                        </>
                    )}
                />
                <Route
                    path="/players"
                    render={() => (
                        <>
                            <TeamsToolbar title="Managing Players"/>
                            <PlayerPage/>
                        </>
                    )}
                />
            </div>
        </Router>
    )
});
