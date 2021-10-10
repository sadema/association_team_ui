import {withStyles} from "@material-ui/core/styles";
import PlayerList from "./PlayerList";
import {useState} from "react";
import {PlayerListContext} from "./PlayerListContext";
import {PlayerDialog} from "./PlayerDialog";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
})

const PlayerPage = withStyles(styles)(({classes}) => {
    const [playerIndex, setPlayerIndex] = useState(0);

    const [dialogOpen, setDialogOpen] = useState(false);

    const onPlayerSelect = (index) => {
        console.log(index);
        setPlayerIndex(index);
        setDialogOpen(true);
    }

    return (
        <>
            <PlayerListContext.Consumer>
                {({playerState: [players]}) => (
                    <div className={classes.root}>
                        <PlayerList selectedPlayer={players[playerIndex]}
                                    onPlayerSelect={index => onPlayerSelect(index)}/>
                        <PlayerDialog dialogOpen={dialogOpen}
                                      onDialogClose={() => setDialogOpen(false)}
                                      selectedPlayer={players[playerIndex]}
                                      playerIndex={playerIndex}
                        />
                    </div>
                )}
            </PlayerListContext.Consumer>
        </>
    );
});

export default PlayerPage;
