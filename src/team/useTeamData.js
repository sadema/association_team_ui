import {useEffect, useState} from "react";
import {teamWebClientFetch} from "./teamWebClientFetch";

// export const useTeamData = () => {
//     const [teamsByReference, setTeamsByReference] = useState(new Map());
//
//     useEffect(() => {
//         teamWebClientFetch()
//             .then((teamsByReference) => {
//                 console.log(teamsByReference);
//                 setTeamsByReference(teamsByReference);
//             });
//     }, []);
//     return teamsByReference;
// }

export const useTeamData = () => {
    const [teams, setTeams] = useState([{ref: 0, name: 'None'}]);

    useEffect(() => {
        teamWebClientFetch()
            .then((teams) => {
                console.log(teams);
                setTeams(teams);
            });
    }, []);
    return teams;
}
