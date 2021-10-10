import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {useState} from "react";
import {TeamList} from "./TeamList";
import {PlayerListContext} from "../player/PlayerListContext";
import {TeamForm} from "./TeamForm";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
})

const TeamPage = withStyles(styles)(({classes}) => {

    const [teamIndex, setTeamIndex] = useState(0);

    // useEffect(() => {
    //     if (players.length > 0) {
    //         setPlayer(players[playerIndex]);
    //     }
    // }, [playerIndex]);

    return (
        <PlayerListContext.Consumer>
            {({teamState: [teams]}) => (
                <div className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid key={'left'} item xs={12} sm={4} md={3}>
                            <TeamList selectedTeam={teams[teamIndex]} onTeamSelect={index => setTeamIndex(index)}/>
                        </Grid>
                        <Grid key={'right'} item xs={12} sm={8} md={9}>
                            <TeamForm selectedTeam={teams[teamIndex]} teamIndex={teamIndex}/>
                        </Grid>
                    </Grid>
                </div>
            )}
        </PlayerListContext.Consumer>
    );
});

export default TeamPage;
