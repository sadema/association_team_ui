import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import {PlayerForm} from "./PlayerForm";

export const PlayerDialog = ({dialogOpen, onDialogClose, selectedPlayer, playerIndex}) => {

    return (
        <Dialog open={dialogOpen} onClose={onDialogClose}>
            <DialogTitle>Player</DialogTitle>
            <DialogContent>
                <PlayerForm selectedPlayer={selectedPlayer} playerIndex={playerIndex} onDialogClose={onDialogClose}/>
            </DialogContent>
        </Dialog>
    );

};
