import React, {useEffect, useState} from 'react';

export const SelectService = ({services, selectedService,onChange}) => {


    return (
        <div>
            <select value={selectedService} onChange={onChange}>
                <option value="">Выберите службу</option>
                {services.map((service) => (
                    <option key={service.id} value={service.name}>{service.name}</option>
                ))}
            </select>
        </div>
    );
};

