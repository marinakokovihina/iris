import React from 'react';

export const SelectStation = ({selectedStations, stations, onChange}) => {

    const formattedStations = stations.map((station, index) => ({
        id: index + 1,
        name: station
    }));

    return (
        <select value={selectedStations} onChange={onChange}>
            <option value="">Выберите станцию</option>
            {formattedStations.map((station) => (
                <option key={formattedStations.id} value={formattedStations.id}>{formattedStations.name}</option>
            ))}
        </select>
    );
};

