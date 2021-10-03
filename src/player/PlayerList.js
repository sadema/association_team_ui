import {withStyles} from "@material-ui/core/styles";
import {useContext} from "react";
import {PlayerListContext} from "./PlayerListContext";
import {List, ListItem, ListItemText} from "@material-ui/core";

const styles = theme => ({});

const PlayerList = withStyles(styles)(({classes, ...props}) => {
    const {selectedPlayer, onPlayerSelect} = props;
    const {teams, playerState} = useContext(PlayerListContext);

    const [players, setPlayers] = playerState;

    const getTeam = (teamReference) => {
        let team = null;
        if (teamReference) {
            team = teams.find(team => team.reference === teamReference);
        }
        console.log("ref: ", teamReference, " team: ", team);
        return (team ? team.name : 'No teamplayer yet');
    }

    return (
        <List>
            {selectedPlayer && players && players.map((it, index) => (
                <ListItem
                    key={index}
                    button
                    dense
                    selected={it.reference === selectedPlayer.reference}
                    onClick={() => onPlayerSelect(index)}
                >
                    <ListItemText
                        primary={`${it.firstName} ${it.lastName}`}
                        secondary={getTeam(it.teamReference)}
                        primaryTypographyProps={{
                            color: it.selected ? 'primary' : undefined
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );
});

export default PlayerList;
