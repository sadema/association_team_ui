import {withStyles} from "@material-ui/core/styles";
import {useContext, useEffect, useState} from "react";
import {CircularProgress, Grid} from "@material-ui/core";
import {PlayerListContext} from "./PlayerListContext";
import {PlayerUpdateActions} from "./PlayerUpdateActions";
import {GenericInputField} from "../component/GenericInputField";
import {TeamSelect} from "../team/TeamSelect";
import {Roles} from "./Roles";

const styles = theme => ({
    container: {
        margin: theme.spacing(2)
    }
});

export const PlayerForm = withStyles(styles)(({classes, ...props}) => {
    const {selectedPlayerIndex} = props;
    const {players} = useContext(PlayerListContext);

    const [player, setPlayer] = useState(null);

    const [inputs, setInputs] = useState(null);

    const [teamReference, setTeamReference] = useState('0');

    const [roleReference, setRoleReference] = useState('UNKNOWN');

    useEffect(() => {
        if (players.length > 0) {
            const player = players[selectedPlayerIndex];
            setPlayer(player);
        }
    }, [selectedPlayerIndex, players]);

    useEffect(() => {
        if (player) {
            const newInputs = [
                {id: 'firstName', label: 'Firstname', value: player.firstName},
                {id: 'lastName', label: 'Lastname', value: player.lastName}
            ];
            setInputs(newInputs);
            setTeamReference(player.team_reference);
            setRoleReference(player.role);
        }
    }, [player]);

    const onSetFieldValue = (id, value) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);
        newInputs[index] = {...inputs[index], value: value};
        setInputs(newInputs);
    }

    const onTeamChange = (e) => {
        console.log("onTeamChange: ", e.target.value);
        setTeamReference(e.target.value);
    }

    const onRoleChange = (e) => {
        console.log("onRoleChange: ", e.target.value);
        setRoleReference(e.target.value);
    }

    const onUndo = () => {
        console.log("onUndo");
        const newInputs = [...inputs];
        newInputs[0] = {...inputs[0], value: player.firstName};
        newInputs[1] = {...inputs[1], value: player.lastName};
        setInputs(newInputs);
        setTeamReference(player.team_reference);
        setRoleReference(player.role);
    }

    const haveMemberPropertiesChanged = () => {
        return player.firstName !== inputs[0].value ||
            player.lastName !== inputs[1].value;
    }

    const updatePlayerData = async (url, body) => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).catch((err) => {
            console.warn(err);
        });
        return response.status;
    };

    const onSave = () => {
        console.log("onSave");
        const playerBody = {};
        const newPlayer = {...player};
        if (player.team_reference !== teamReference) {
            playerBody.teamReference = teamReference;
            newPlayer.team_reference = teamReference;
        }
        if (player.role !== roleReference) {
            playerBody.playerRole = roleReference;
            newPlayer.role = roleReference;
        }
        if (newPlayer !== player) {
            if (haveMemberPropertiesChanged()) {
                newPlayer.firstName = inputs[0].value;
                newPlayer.lastName = inputs[1].value;
            }
            const uri = `/teams-api/players/${player.reference}`;
            updatePlayerData(uri, playerBody)
                .then((status) => {
                    console.log("http status: ", status);
                    if (status === 204) {
                        // TODO Sjoerd: update players
                    }
                });
        }
        if (haveMemberPropertiesChanged()) {
            // TODO Sjoerd: memberservice api aanroepen
        }
    }

    if (!player || !inputs) {
        return <CircularProgress/>
    }

    return (
        <>
            <Grid container spacing={4} className={classes.container} justifyContent={"flex-start"}
                  direction={"column"}>
                {inputs.map((input, index) => (
                    <GenericInputField key={index} id={input.id} label={input.label} value={input.value}
                                       onSetFieldValue={onSetFieldValue}/>
                ))}
                <TeamSelect teamReference={teamReference} onChange={onTeamChange}/>
                <Roles roleReference={roleReference} onRoleChange={onRoleChange}/>
            </Grid>
            <Grid container spacing={4} className={classes.container} justifyContent={"flex-start"} direction={"row"}>
                <Grid key={'PlayerUpdateActions'} item>
                    <PlayerUpdateActions onUndo={onUndo} onSave={onSave} disabled={false}/>
                </Grid>
            </Grid>
        </>
    )
})
