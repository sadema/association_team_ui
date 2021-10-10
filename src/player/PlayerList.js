import {withStyles} from "@material-ui/core/styles";
import {PlayerListContext} from "./PlayerListContext";
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Roles} from "./Roles";

const styles = theme => ({
    root: {margin: theme.spacing(2)},
    tableRow: {
        "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: theme.palette.primary.main,
            "& > .MuiTableCell-root": {
                color: "white"
            }
        }
    }
});

const PlayerList = withStyles(styles)(({classes, ...props}) => {
    const {selectedPlayer, onPlayerSelect} = props;

    const getTeam = (teams, teamReference) => {
        let team = null;
        if (teamReference) {
            team = teams.find(team => team.reference === teamReference);
        }
        return (team ? `${team.name} ${team.description}` : 'No teamplayer yet');
    }

    const roleOptions = Roles();
    const findRoleOptionById = (id) => {
        return roleOptions.find(it => it.id === id) || roleOptions[0];
    }


    return (
        <>
            {selectedPlayer && (
                <PlayerListContext.Consumer>
                    {({playerState: [players], teamState: [teams]}) => (
                        <Paper className={classes.root}>
                            <Table style={{width: '100%'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Team</TableCell>
                                        <TableCell align="right">Role</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {players.map((it, index) => {
                                        return (
                                            <TableRow key={index}
                                                      onClick={() => onPlayerSelect(index)}
                                                      selected={it.reference === selectedPlayer.reference}
                                                      hover={true}
                                                      className={classes.tableRow}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {`${it.firstName} ${it.lastName}`}
                                                </TableCell>
                                                <TableCell>{getTeam(teams, it.teamReference)}</TableCell>
                                                <TableCell align="right">{findRoleOptionById(it.playerRole).label}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    )}
                </PlayerListContext.Consumer>
            )}
        </>
    );
});

export default PlayerList;
