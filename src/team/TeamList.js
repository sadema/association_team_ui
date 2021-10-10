import {withStyles} from "@material-ui/core/styles";
import {PlayerListContext} from "../player/PlayerListContext";
import {List, ListItem, ListItemText} from "@material-ui/core";

const styles = theme => ({});

export const TeamList = withStyles(styles)(({classes, ...props}) => {
    const {selectedTeam, onTeamSelect} = props;

    return (
        <PlayerListContext.Consumer>
            {({teamState: [teams]}) => (
                <List>
                    {teams && teams.map((it, index) => (
                        <ListItem
                            key={index}
                            button
                            dense
                            selected={it.reference === selectedTeam.reference}
                            onClick={() => onTeamSelect(index)}
                        >
                            <ListItemText
                                primary={`${it.name} ${it.category}`}
                                secondary={it.description}
                                primaryTypographyProps={{
                                    color: it.reference === selectedTeam.reference ? 'primary' : undefined
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </PlayerListContext.Consumer>
    );
});
