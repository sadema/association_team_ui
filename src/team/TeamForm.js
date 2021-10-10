import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {GenericInputField} from "../component/GenericInputField";
import {useEffect, useState} from "react";
import {PlayerListContext} from "../player/PlayerListContext";
import {FormUpdateActions} from "../component/FormUpdateActions";
import {saveTeam} from "./saveTeam";

const styles = theme => ({
    container: {
        margin: theme.spacing(2)
    }
});

export const TeamForm = withStyles(styles)(({classes, ...props}) => {

    const {selectedTeam, teamIndex} = props;

    const [inputs, setInputs] = useState(null);

    useEffect(() => {
        if (selectedTeam) {
            const newInputs = [
                {id: 'name', label: 'Team', value: selectedTeam.name},
                {id: 'category', label: 'Category', value: selectedTeam.category},
                {id: 'description', label: 'Description', value: selectedTeam.description}
            ];
            setInputs(newInputs);

        }
    }, [selectedTeam]);

    const onSetFieldValue = (id, value) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);
        newInputs[index] = {...inputs[index], value: value};
        setInputs(newInputs);
    }

    const onUndo = () => {
        const newInputs = [...inputs];
        newInputs[0] = {...inputs[0], value: selectedTeam.name};
        newInputs[1] = {...inputs[1], value: selectedTeam.category};
        newInputs[2] = {...inputs[2], value: selectedTeam.description};
        setInputs(newInputs);
    }

    const onSave = (teams, setTeams) => {
        const newTeam = {...selectedTeam};
        saveTeam(newTeam, teamIndex, teams, setTeams);

    }

    return (
        <>
            {selectedTeam && inputs && (
                <PlayerListContext.Consumer>
                    {({teamState: [teams, setTeams]}) => (
                        <>
                            <Grid container spacing={4} className={classes.container} justifyContent={"flex-start"}
                                  direction={"column"}>
                                {inputs.map((input, index) => (
                                    <GenericInputField key={index} id={input.id} label={input.label} value={input.value}
                                                       onSetFieldValue={onSetFieldValue}/>
                                ))}
                            </Grid>
                            <Grid container spacing={4} className={classes.container} justifyContent={"flex-start"}
                                  direction={"row"}>
                                <Grid key={'PlayerUpdateActions'} item>
                                    <FormUpdateActions onUndo={onUndo}
                                                       onSave={() => onSave(teams, setTeams)}
                                                       disabled={false}/>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </PlayerListContext.Consumer>
            )}
        </>
    );
});
