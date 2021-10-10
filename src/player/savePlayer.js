export const savePlayer = (newPlayer, playerIndex, playerState) => {
    const [players, setPlayers] = playerState;
    const uri = `/teams-api/players/${newPlayer.reference}`;

    const updatePlayerData = async (uri, body) => {
        const response = await fetch(uri, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).catch((err) => {
            console.warn(err);
        });
        return response.status;
    };

    updatePlayerData(uri, newPlayer)
        .then((status) => {
            console.log("http status: ", status);
            if (status === 204) {
                console.log("newPlayer", newPlayer);
                const newPlayers = [...players];
                newPlayers[playerIndex] = newPlayer;
                console.log(newPlayers);
                setPlayers(newPlayers);
            }
        });
}
