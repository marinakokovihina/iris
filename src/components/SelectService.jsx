import React, {useEffect, useState} from 'react';
import {StyledSelectService} from "./styles/StyledAsync";

export const SelectService = ({services, selectedService,onChange}) => {


    return (
            <StyledSelectService value={selectedService} onChange={onChange} id="testSelect">
                <option disabled value="">Выберите службу</option>
                {services.map((service) => (
                    <option key={service.id} value={service.name}>{service.name}</option>
                ))}
            </StyledSelectService>

    );
};

