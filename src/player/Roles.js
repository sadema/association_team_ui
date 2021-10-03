import {FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useEffect} from "react";

export const Roles = ({playerRole, onRoleChange}) => {

    const roleOptions = [
        {label: 'Onbekend', id: 'UNKNOWN', selected: true},
        {label: 'Keeper', id: 'KEEPER'},
        {label: 'Verdediger', id: 'DEFENDER'},
        {label: 'Middenvelder', id: 'MIDFIELD'},
        {label: 'Aanvaller', id: 'STRIKER'},
    ];

    useEffect(() => {

    }, [playerRole]);

    return (
        <Grid key={"role"} item>
            <FormControl>
                <InputLabel htmlFor="roles">Role</InputLabel>
                <Select
                    value={playerRole}
                    onChange={e => onRoleChange(e)}
                    inputProps={{
                        name: 'roles',
                        id: 'roles'
                    }}
                >
                    {roleOptions.map(it => (
                        <MenuItem key={it.id} value={it.id}>
                            {it.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
}
