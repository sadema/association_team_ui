import axios from "axios";

const getAllTeams = () => {
    axios.get('/querydb/teams/_design/team/_view/all-teams')
        .then(response => {
            const teamsById = response.data.rows
                .reduce((teamMap,it) => {
                    teamMap.set(it.value._id, {
                        ref: it.value._id,
                        name: it.value.teamName,
                        category: it.value.teamCategory || '',
                        description: it.value.teamDescription || ''
                    });
                    return teamMap;
                },new Map());
            console.log(teamsById);
            return teamsById;
        })
        .catch(error => console.log("Could not get teams data"));
}
