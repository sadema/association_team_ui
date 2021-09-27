import {FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useEffect, useState} from "react";

export const Roles = ({roleReference, onRoleChange}) => {

    const [roleOptions, setRoleOptions] = useState([
        {label: 'Onbekend', id: 'UNKNOWN', selected: true},
        {label: 'Keeper', id: 'KEEPER'},
        {label: 'Verdediger', id: 'DEFENDER'},
        {label: 'Middenvelder', id: 'MIDFIELD'},
        {label: 'Aanvaller', id: 'STRIKER'},
    ]);

    useEffect(() => {
        console.log('roleReference: ', roleReference);
            const newRoleOptions = [...roleOptions]
            if (role.selected) {
                role.selected = false;
            }
            const newSelected = newRoleOptions.find(role => role.id === roleReference);
            if (newSelected)
                newSelected.selected = true;
            setRoleOptions(newRoleOptions);
    }, [roleReference]);

    const role = roleOptions.find(role => role.selected) || {
        id: 'UNKNOWN'
    };

    return (
        <Grid key={"role"} item>
            <FormControl>
                <InputLabel htmlFor="roles">Role</InputLabel>
                <Select
                    value={role.id}
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
