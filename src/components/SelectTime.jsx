import React from 'react';

export const SelectTime = ({selectedHour, handleHourChange, hours, selectedMinute, handleMinuteChange, minutes, selectedSecond, handleSecondChange, seconds}) => {
    return (
        <div>
            <select value={selectedHour} onChange={handleHourChange}>
                {hours.map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                ))}
            </select>
            <span> : </span>
            <select value={selectedMinute} onChange={handleMinuteChange}>
                {minutes.map(minute => (
                    <option key={minute} value={minute}>{minute}</option>
                ))}
            </select>
            <span> : </span>

            <select value={selectedSecond} onChange={handleSecondChange}>
                {
                    seconds.map(second => (
                        <option key={second} value={second}>{second}</option>
                    ))
                }
            </select>
        </div>
    );
};

