import {withStyles} from "@material-ui/core/styles";
import {useContext, useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {PlayerListContext} from "./PlayerListContext";
import {TeamSelect} from "../team/TeamSelect";
import {PlayerUpdateActions} from "./PlayerUpdateActions";
import {GenericInputField} from "../component/GenericInputField";

const styles = theme => ({
    container: {
        margin: theme.spacing(2)
    }
});

export const PlayerForm = withStyles(styles)(({classes, ...props}) => {
    const {selectedPlayerIndex} = props;
    const {players} = useContext(PlayerListContext);

    const [player, setPlayer] = useState();

    const [inputs, setInputs] = useState([
        {id: 'firstName', label: 'Firstname', value: ''},
        {id: 'lastName', label: 'Lastname', value: ''}
    ]);

    useEffect(() => {
        if (players.length > 0) {
            const player = players[selectedPlayerIndex];
            setPlayer(player);
            const newInputs = [];
            newInputs[0] = {...inputs[0], value: player.firstName};
            newInputs[1] = {...inputs[1], value: player.lastName};
            setInputs(newInputs);
        }
    }, [selectedPlayerIndex, players]);

    const onSetFieldValue = (id, value) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);
        newInputs[index] = {...inputs[index], value: value};
        setInputs(newInputs);
    }

    const onUndo = () => {
        console.log("onUndo");
        const newInputs = [...inputs];
        newInputs[0] = {...inputs[0], value: player.firstName};
        newInputs[1] = {...inputs[1], value: player.lastName};
        setInputs(newInputs);
    }

    const onSave = () => {
        console.log("onSave");
        if (player.firstName !== inputs[0].value ||
                player.lastName !== inputs[1].value) {

        }
    }

    return (
        <>
            <Grid container spacing={4} className={classes.container} justify={"flex-start"} direction={"column"}>
                {inputs.map(input => (
                    <GenericInputField id={input.id} label={input.label} value={input.value} onSetFieldValue={onSetFieldValue}/>
                ))}
                {/*<PlayerInputFields player={player}/>*/}
                <TeamSelect player={player}/>
            </Grid>
            <Grid container spacing={4} className={classes.container} justify={"flex-start"} direction={"row"}>
                <Grid key={'PlayerUpdateActions'} item>
                    <PlayerUpdateActions onUndo={onUndo} onSave={onSave} disabled={false}/>
                </Grid>
            </Grid>
        </>
    )
})
