import {useContext, useEffect, useState} from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import {PlayerListContext} from "../player/PlayerListContext";

export const TeamSelect = ({teamReference, onChange}) => {
    const {teams} = useContext(PlayerListContext);

    const [teamOptions, setTeamOptions] = useState(null);

    useEffect(() => {
        console.log('Aantal teams: ', teams.length);
        if (teams.length > 0) {
            setTeamOptions(teams.reduce((newTeamSelects, it) => {
                console.log("it: ", it);
                newTeamSelects.push({
                    id: it.reference,
                    label: it.name,
                    selected: it.id === teamReference
                });
                return newTeamSelects;
            }, [{id: '0', label: 'None', selected: true}]));
        }
    }, [teams]);

    // useEffect(() => {
    //     console.log('teamReference: ', teamReference);
    //     if (teamOptions) {
    //         const newTeamOptions = [...teamOptions]
    //         // newTeamOptions.find(team => team.selected);
    //         // if (team && team.selected) {
    //         //     team.selected = false;
    //         // }
    //         const newSelected = newTeamOptions.find(team => team.id === teamReference);
    //         if (newSelected)
    //             newSelected.selected = true;
    //         setTeamOptions(newTeamOptions);
    //     }
    // }, [teamReference]);

    // const team = teamOptions?.find(team => team.selected) || {
    //     id: '0', selected: true
    // };

    return (
        <>
            <Grid key={"selectTeam"} item>
                <FormControl>
                    <InputLabel htmlFor="teams">Team</InputLabel>
                    {teamOptions && (
                        <Select
                            value={teamReference}
                            onChange={e => onChange(e)}
                            inputProps={{
                                name: 'teams',
                                id: 'teams'
                            }}
                        >
                            {teamOptions.map(it => (
                                <MenuItem key={it.id} value={it.id}>
                                    {it.label}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </FormControl>
            </Grid>
        </>
    );
}
