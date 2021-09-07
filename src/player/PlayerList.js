import {withStyles} from "@material-ui/core/styles";
import {useContext} from "react";
import {PlayerListContext} from "./PlayerListContext";
import {List, ListItem, ListItemText} from "@material-ui/core";

const styles = theme => ({});

const PlayerList = withStyles(styles)(({classes, ...props}) => {
    const {onPlayerSelect} = props;
    const {teamsByReference, players} = useContext(PlayerListContext);

    const getTeamByReference = (team_reference) => {
        let team = null;
        if (team_reference) {
            team = teamsByReference.get(it.team_reference);
        }
        console.log("ref: ", team_reference, " team: ", team);
        return (team ? team.name : 'No teamplayer yet');
    }

    return (
        <List>
            {players.map((it, index) => (
                <ListItem
                    key={index}
                    button
                    dense
                    selected={it.selected}
                    onClick={() => onPlayerSelect(index)}
                >
                    <ListItemText
                        primary={`${it.firstName} ${it.lastName}`}
                        secondary={getTeamByReference(it.team_reference)}
                        primaryTypographyProps={{
                            color: it.selected ? 'primary' : undefined
                        }}
                    />
                </ListItem>
                // <div key={index}>Player: {it.firstName}</div>
            ))}
        </List>
    );
});

export default PlayerList;
