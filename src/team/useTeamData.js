import {useEffect, useState} from "react";
import {teamWebClientFetch} from "./teamWebClientFetch";

export const useTeamData = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        teamWebClientFetch()
            .then((teams) => {
                console.log(teams);
                setTeams(teams);
            });
    }, []);
    return [teams, setTeams];
}
