import {FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Roles} from "./Roles";

export const PlayerRole = ({playerRole, onRoleChange}) => {

    const roleOptions = Roles();

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
