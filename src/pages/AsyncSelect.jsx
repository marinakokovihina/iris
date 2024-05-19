import React, {useEffect, useState} from 'react';
import {SelectService} from "../components/SelectService";
import {SelectTime} from "../components/SelectTime";
import {divideString, hours, minutes, seconds, sendGetRequest} from "../store/store";
import axios from "axios";
import {
    AsyncH1, AsyncWrapper, StyledAsync, StyledButtonAsync, StyledButtonAsyncBigger,
    StyledButtonSync, StyledIframe,
    StyledSelectService,
    StyledSync, StyledSyncSelectServices, StyledTable,
    StyledTextSync, StyledTimerAsync, StyledTimerAsyncContainer
} from "../components/styles/StyledAsync";

const AsyncSelect = () => {

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [stations, setStations] = useState([]);
    const [selectedStations, setSelectedStations] = useState('');
    const [selectedSecond, setSelectedSecond] = useState('');
    const [selectedMinute, setSelectedMinute] = useState('');
    const [selectedHour, setSelectedHour] = useState('');

    const handleHourChange = (event) => {
        setSelectedHour(event.target.value);
    };

    const handleMinuteChange = (event) => {
        setSelectedMinute(event.target.value);
    };
    const handleSecondChange = (event) => {
        setSelectedSecond(event.target.value);
    };
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('https://geoscope-vniia.ru/api/v1/services', {
                    headers: {
                        'ngrok-skip-browser-warning': '69420'
                    }
                });

                console.log(response.data);

                const serv = response.data.data.map((item, index) => ({ id: index,   name: item.name, hasSup: item.has_supported_scrap, hasDist: item.has_supported_dist }));
                setServices(serv);
            } catch (error) {
                console.error('Произошла ошибка запроса:', error);
            }
        };

        fetchServices();
    }, []);

    const clickBtnShowStations = async () => {
        try {
            console.log(selectedService)
            const response = await axios.get(`https://geoscope-vniia.ru/api/v1/streams?service_name=${selectedService}`,
             {
                headers: {
                    'ngrok-skip-browser-warning': '69420',
                    'Content-Type': 'application/json'
                },
            });
            const stationList = await Promise.all(response.data.data.map(async (item) => {
                return `${item.network}/${item.station}`;
            }));
            console.log(stationList)
            setStations(stationList);
            setStations(stationList)
            console.log(stations)
        } catch (error) {
            console.error('Ошибка при загрузке данных станций:', error);
        }
    };




    const clickBtnShowResult = async() => {
        const hourNum = Number(selectedHour);
        const minuteIntNum = Number(selectedMinute);
        const secondNum = Number(selectedSecond);
        const timeToRequest = Number((hourNum * 3600) + (minuteIntNum * 60) + secondNum);

        try {
            if (timeToRequest === 0 || isNaN(timeToRequest)) {
                alert('Выберите время! А то я Вам ничего не покажу!');
            } else {
                const { network, station } = divideString(selectedStations);
                const response = await axios.post(`https://geoscope-vniia.ru/api/v1/async_loader`, {
                    'service_name': selectedService,
                    'network': network,
                    'station': station,
                    'interval_sec': timeToRequest
                });
                const taskID = response.data.data.task_id;


                const linkList = await sendGetRequest(taskID, timeToRequest);

                console.log('Cсылки ', linkList);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    async function sendGetRequest(taskId, timeToRequest) {
        let responseValue = '';
        let linkList = [];

        while (responseValue !== 'finished') {
            try {
                const response = await axios.get(`https://geoscope-vniia.ru/api/v1/async_loader`, {
                    headers: {
                        'ngrok-skip-browser-warning': '69420',
                    },
                    params: {
                        'task_id': taskId,
                    }
                });
                responseValue = response.data.data.status;
                console.log(responseValue)
                if (response.data.data.files) {
                    linkList = linkList.concat(response.data.data.files);
                }

                if (responseValue === 'finished') {
                    showLinks(linkList);
                }
            } catch (error) {
                console.error('Произошла ошибка запроса:', error.message);
            }
            await new Promise((resolve) => setTimeout(resolve, timeToRequest * 1000 / 2));
        }

        console.log('Значение изменилось на "finished".');
        return linkList;
    }
    useEffect(() => {
        if (selectedService) {
            clickBtnShowStations();
        }
    }, [selectedService]);
    const showLinks = (linkList) => {

        var table = document.getElementById('TableForLinks');
        table.innerHTML = '';
        var header = table.createTHead();
        var row = header.insertRow(0);
        var idCell = row.insertCell(0);
        var linkCell = row.insertCell(1);
        idCell.textContent = 'ID ссылки';
        linkCell.textContent = 'Ссылка';
        linkList.forEach((item, index) => {
            var newRow = table.insertRow();
            var newIdCell = newRow.insertCell(0);
            var newLinkCell = newRow.insertCell(1);
            newIdCell.textContent = index + 1; // Индекс + 1 как ID
            newLinkCell.innerHTML = `<a href="${item}" target="_blank">${item}</a>`;});


    }

    return (
        <StyledAsync>
            <AsyncH1> Непрерывные данные </AsyncH1>
            <StyledSyncSelectServices>
                <SelectService onChange={(e) => {
                    setSelectedService(e.target.value);
                }}
                               services={services}
                               selectedService={selectedService}
                />
                <StyledSelectService
                    value={selectedStations}
                    onChange={(e) => {
                        setSelectedStations(e.target.value)

                    }}
                >
                    <option disabled value="">Выберите станцию</option>
                    {stations.map((station, index) => (
                        <option key={index} value={station}>{station}</option>
                    ))}
                </StyledSelectService>
            </StyledSyncSelectServices>



            <StyledTimerAsync>
                <StyledTimerAsyncContainer>
                    <div>Часов</div>
                    <input placeholder="00h" type={"number"} onChange={handleHourChange} />
                </StyledTimerAsyncContainer>
                <StyledTimerAsyncContainer>
                    <div>Минут</div>
                    <input placeholder="00m" type={"number"} onChange={handleMinuteChange}/>
                </StyledTimerAsyncContainer>
                <StyledTimerAsyncContainer>
                    <div>Секунд</div>
                    <input placeholder="00s" type={"number"}  onChange={handleSecondChange} />
                </StyledTimerAsyncContainer>
            </StyledTimerAsync>
            <StyledButtonAsyncBigger onClick={clickBtnShowResult}> Начать загрузку данных </StyledButtonAsyncBigger>

            <StyledTable id="TableForLinks">
                <thead>
                <tr>
                    <th>
                        №
                    </th>
                    <th>
                        Ссылка на скачивание
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr> <td></td><td> Данных нет </td> </tr>
                </tbody>
            </StyledTable>


        </StyledAsync>
    );
};

export default AsyncSelect;
