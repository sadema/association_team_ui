export const playerWebClientFetch = () => {

    const buildPlayerList = (rows) => {
        return rows.reduce((playerList, it) => {
            playerList.push({
                reference: it.id,
                firstName: it.value.firstName,
                lastName: it.value.lastName,
                teamReference: it.value.team_reference || '0',
                playerRole: it.value.role,
                itemSelected: false
            });
            return playerList;
        }, []);
    }

    const fetchPlayers = async () => {
        const response = await fetch('/querydb/teams/_design/team/_view/all-players');
        const data = await response.json();
        // console.log("rows: ", data.rows);
        const playerList = buildPlayerList(data.rows);
        return playerList;
    }

    return fetchPlayers();
}
