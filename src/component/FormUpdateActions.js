import {Box, Button} from "@material-ui/core";

export const FormUpdateActions = ({onCancel, onSave, onUndo}) => {
    const disabled = false;

    return (
        <>
            <Box component="span" m={1}>
                <Button variant={"outlined"} color={"secondary"} onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
            <Box component="span" m={1}>
                <Button variant={"outlined"} color={"primary"} disabled={disabled} onClick={onSave}>
                    Save
                </Button>
            </Box>
            <Box component="span" m={1}>
                <Button variant={"outlined"} color={"secondary"} onClick={onUndo}>
                    Undo changes
                </Button>
            </Box>
        </>
    )
}
