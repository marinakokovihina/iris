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



export async function sendGetRequest(taskId, timeToRequest) {
    let responseValue = '';
    let linkList = [];

    while (responseValue !== 'finished') {
        try {
            const response = await axios.get(`https://geoscope-vniia.ru/api/v1/async_loader`, {
               headers:{
                   'ngrok-skip-browser-warning': '69420',
               },
                params: {
                   'task_id':  taskId,
                }
            });
            console.log(response)
            console.log(responseValue)
            responseValue = response.data.data.status;
            console.log('Ответ от сервера:', responseValue);

            if (response.data.data.files) {
                linkList = linkList.concat(response.data.data.files);
                console.log('In IF')
                console.log(linkList)

            }

        } catch (error) {
            console.error('Произошла ошибка запроса:', error.message);
        }
        await new Promise((resolve) => setTimeout(resolve, timeToRequest*1000)); // Ждем 2 секунды перед следующим запросом
    }

    console.log('Значение изменилось на "finished".');
    //console.log(linkList)
    alert('Файлы получены! Нажми на кнопку "Вывести ссылки"')

    return linkList
}
