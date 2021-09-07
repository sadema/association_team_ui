import {Box, Button} from "@material-ui/core";

export const PlayerUpdateActions = ({onUndo, onSave}) => {
    const disabled = false;

    return (
        <>
            <Box component="span" m={1}>
                <Button variant={"outlined"} color={"secondary"} onClick={onUndo}>
                    Undo changes
                </Button>
            </Box>
            <Box component="span" m={1}>
                <Button variant={"outlined"} color={"primary"} disabled={disabled} onClick={onSave}>
                    Save
                </Button>
            </Box>
        </>
    )
}
