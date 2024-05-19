import React from 'react';
import {SelectTimeDivStyled, SelectTimeStyled} from "./styles/StyledAsync";

export const SelectTime = ({selectedHour, handleHourChange, hours, selectedMinute, handleMinuteChange, minutes, selectedSecond, handleSecondChange, seconds}) => {
    return (
        <SelectTimeDivStyled>
            <SelectTimeStyled value={selectedHour} onChange={handleHourChange}>
                {hours.map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                ))}
            </SelectTimeStyled>
            <span> : </span>
            <SelectTimeStyled value={selectedMinute} onChange={handleMinuteChange}>
                {minutes.map(minute => (
                    <option key={minute} value={minute}>{minute}</option>
                ))}
            </SelectTimeStyled>
            <span> : </span>

            <SelectTimeStyled value={selectedSecond} onChange={handleSecondChange}>
                {
                    seconds.map(second => (
                        <option key={second} value={second}>{second}</option>
                    ))
                }
            </SelectTimeStyled>
        </SelectTimeDivStyled>
    );
};

