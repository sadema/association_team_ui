import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import PlayerList from "./PlayerList";
import {useContext, useEffect, useState} from "react";
import {PlayerListContext} from "./PlayerListContext";
import {PlayerForm} from "./PlayerForm";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
})

const PlayerPage = withStyles(styles)(({classes}) => {
    const {playerState} = useContext(PlayerListContext);

    const [players, setPlayers] = playerState;

    const [playerIndex, setPlayerIndex] = useState(0);

    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if (players) {
            const player = players[playerIndex];
            setPlayer(player);
        }
    }, [players]);

    useEffect(() => {
        if (players.length > 0) {
           setPlayer(players[playerIndex]);
        }
    }, [playerIndex]);

    return (
        // <PlayerListContext.Provider value={{teams: useTeamData(), players: usePlayerData()}}>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid key={'left'} item xs={12} sm={4} md={3}>
                        <PlayerList selectedPlayer={player} onPlayerSelect={index => setPlayerIndex(index)}/>
                    </Grid>
                    <Grid key={'right'} item xs={12} sm={8} md={9}>
                        <PlayerForm selectedPlayer={player} playerIndex={playerIndex}/>
                    </Grid>
                </Grid>
            </div>
        // </PlayerListContext.Provider>
    );
});

export default PlayerPage;
