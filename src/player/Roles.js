export const Roles = () => {

    const roleOptions = [
        {label: 'Onbekend', id: 'UNKNOWN', selected: true},
        {label: 'Keeper', id: 'KEEPER'},
        {label: 'Verdediger', id: 'DEFENDER'},
        {label: 'Middenvelder', id: 'MIDFIELD'},
        {label: 'Aanvaller', id: 'STRIKER'},
    ];

    return roleOptions;
}
