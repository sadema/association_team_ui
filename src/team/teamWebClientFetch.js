export const teamWebClientFetch = () => {

    const buildTeams = (rows) => {
       return rows.reduce((teamList,it) => {
          teamList.push({
              reference: it.value._id,
              name: it.value.teamName,
              category: it.value.teamCategory || '',
              description: it.value.teamDescription || ''
          });
          return teamList;
       }, []);
    }

    const fetchTeams = async () => {
        const response = await fetch('/querydb/teams/_design/team/_view/all-teams');
        const data = await response.json();
        const teams = buildTeams(data.rows);
        return teams;
    }

    return fetchTeams();
}
