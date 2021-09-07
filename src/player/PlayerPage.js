import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import PlayerList from "./PlayerList";
import {PlayerListContext} from "./PlayerListContext";
import {usePlayerData} from "./usePlayerData";
import {useTeamData} from "../team/useTeamData";
import {PlayerForm} from "./PlayerForm";
import {useState} from "react";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
})

const PlayerPage = withStyles(styles)(({classes}) => {
    const [selectedPlayerIndex, setPlayerIndex] = useState(0)
    const onPlayerSelect = (index) => {
        setPlayerIndex(index);
    }

    return (
        <PlayerListContext.Provider value={{teamsByReference: useTeamData(), players: usePlayerData()}}>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid key={'left'} item xs={12} sm={4} md={3}>
                        <PlayerList onPlayerSelect={onPlayerSelect}/>
                    </Grid>
                    <Grid key={'right'} item xs={12} sm={8} md={9}>
                        <PlayerForm selectedPlayerIndex={selectedPlayerIndex}/>
                    </Grid>
                </Grid>
            </div>
        </PlayerListContext.Provider>
    );
});

export default PlayerPage;
