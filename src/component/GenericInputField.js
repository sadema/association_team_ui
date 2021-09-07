import {Grid, TextField} from "@material-ui/core";

export const GenericInputField = ({id, label, value, onSetFieldValue}) => {

    const onInputChange = ({target: {id, value}}) => {
        onSetFieldValue(id, value);
    }

    return (
        <Grid key={id} item>
            <TextField InputLabelProps={{ shrink: true }}
                id={id}
                label={label}
                value={value}
                onChange={onInputChange}
            />
        </Grid>
    )
}
