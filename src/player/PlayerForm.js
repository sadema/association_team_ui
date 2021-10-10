import {withStyles} from "@material-ui/core/styles";
import {useContext, useEffect, useState} from "react";
import {CircularProgress, Grid} from "@material-ui/core";
import {FormUpdateActions} from "../component/FormUpdateActions";
import {GenericInputField} from "../component/GenericInputField";
import {TeamSelect} from "../team/TeamSelect";
import {savePlayer} from "./savePlayer";
import {PlayerListContext} from "./PlayerListContext";
import {PlayerRole} from "./PlayerRole";

const styles = theme => ({
    container: {
        margin: theme.spacing(2)
    }
});

export const PlayerForm = withStyles(styles)(({classes, ...props}) => {
    const {selectedPlayer, playerIndex, onDialogClose} = props;
    const {playerState} = useContext(PlayerListContext);

    const [inputs, setInputs] = useState(null);

    const [teamReference, setTeamReference] = useState('0');

    const [playerRole, setPlayerRole] = useState('UNKNOWN');

    useEffect(() => {
        if (selectedPlayer) {
            const newInputs = [
                {id: 'firstName', label: 'Firstname', value: selectedPlayer.firstName},
                {id: 'lastName', label: 'Lastname', value: selectedPlayer.lastName}
            ];
            setInputs(newInputs);
            setTeamReference(selectedPlayer.teamReference);
            setPlayerRole(selectedPlayer.playerRole || 'UNKNOWN');
        }
    }, [selectedPlayer]);

    const onSetFieldValue = (id, value) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);
        newInputs[index] = {...inputs[index], value: value};
        setInputs(newInputs);
    }

    const onUndo = () => {
        const newInputs = [...inputs];
        newInputs[0] = {...inputs[0], value: selectedPlayer.firstName};
        newInputs[1] = {...inputs[1], value: selectedPlayer.lastName};
        setInputs(newInputs);
        setTeamReference(selectedPlayer.teamReference);
        setPlayerRole(selectedPlayer.playerRole || 'UNKNOWN');
    }

    const haveMemberPropertiesChanged = inputs => {
        return selectedPlayer.firstName !== inputs[0].value ||
            selectedPlayer.lastName !== inputs[1].value;
    }

    const onSave = () => {
        const newPlayer = {...selectedPlayer};
        newPlayer.teamReference = teamReference;
        newPlayer.playerRole = playerRole;
        if (newPlayer.teamReference !== selectedPlayer.teamReference ||
                newPlayer.playerRole !== selectedPlayer.playerRole) {
            savePlayer(newPlayer, playerIndex, playerState);
            onDialogClose();
        }
        if (haveMemberPropertiesChanged(inputs)) {
            newPlayer.firstName = inputs[0].value;
            newPlayer.lastName = inputs[1].value;
            // TODO Sjoerd: memberservice api aanroepen
        }

    }

    if (!selectedPlayer || !inputs) {
        return <CircularProgress/>
    }

    return (
        <>
            {selectedPlayer && inputs && (
                <>
                    <Grid container spacing={4} className={classes.container} justifyContent={"flex-start"}
                          direction={"column"}>
                        {inputs.map((input, index) => (
                            <GenericInputField key={index} id={input.id} label={input.label} value={input.value}
                                               onSetFieldValue={onSetFieldValue}/>
                        ))}
                        <TeamSelect teamReference={teamReference} onChange={e => setTeamReference(e.target.value)}/>
                        <PlayerRole playerRole={playerRole} onRoleChange={e => setPlayerRole(e.target.value)}/>
                    </Grid>
                    <Grid container spacing={4} className={classes.container} justifyContent={"flex-start"}
                          direction={"row"}>
                        <Grid key={'PlayerUpdateActions'} item>
                            <FormUpdateActions onCancel={onDialogClose}
                                               onSave={onSave}
                                               onUndo={onUndo}
                                               disabled={false}/>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    )
})
