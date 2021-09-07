export const teamWebClientFetch = () => {

    const buildTeamsByReference = (rows) => {
        return rows.reduce((teamMap,it) => {
            teamMap.set(it.value._id, {
                ref: it.value._id,
                name: it.value.teamName,
                category: it.value.teamCategory || '',
                description: it.value.teamDescription || ''
            });
            return teamMap;
        },new Map());
    }

    const fetchTeams = async () => {
        const response = await fetch('/querydb/teams/_design/team/_view/all-teams');
        const data = await response.json();
        console.log('rows: ', data.rows);
        const teamsByReference = buildTeamsByReference(data.rows);
        return teamsByReference;
    }

    return fetchTeams();
}
