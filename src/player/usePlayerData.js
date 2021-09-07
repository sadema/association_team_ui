import {useEffect, useState} from "react";
import {playerWebClientFetch} from "./playerWebClientFetch";

export const usePlayerData = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        playerWebClientFetch()
            .then((list) => {
                console.log("playerList: ", list);
                setPlayers(list);
            });
    }, []);
    return players;
};
