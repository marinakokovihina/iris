import create from 'zustand';
import axios from "axios";

export const storeDate = create((set) => ({
    services: [],
    selectedService: '',
    stations: [],
    selectedStations: '',
    selectedSecond: '',
    selectedMinute: '',
    selectedHour: '',

    setServices: (services) => set({ services }),
    setSelectedService: (selectedService) => set({ selectedService }),
    setStations: (stations) => set({ stations }),
    setSelectedStations: (selectedStations) => set({ selectedStations }),
    setSelectedSecond: (selectedSecond) => set({ selectedSecond }),
    setSelectedMinute: (selectedMinute) => set({ selectedMinute }),
    setSelectedHour: (selectedHour) => set({ selectedHour }),
}));

export function divideString(str) {
    const separatorIndex = str.indexOf("/");
    if (separatorIndex === -1) {
        console.log("Разделитель '/' не найден");
        return;
    }

    const network = str.slice(0, separatorIndex).trim();
    const station = str.slice(separatorIndex + 1).trim();

    return { network, station };
}


export const hours = Array.from({length:25}, (_, index) => index);
export const minutes = Array.from({length:61}, (_, index) => index);
export const seconds = Array.from({length:61}, (_, index) => index);



