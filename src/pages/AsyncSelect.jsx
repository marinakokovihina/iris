import React, {useEffect, useState} from 'react';
import {SelectService} from "../components/SelectService";
import {SelectTime} from "../components/SelectTime";
import {divideString, hours, minutes, seconds, sendGetRequest} from "../store/store";
import axios from "axios";

const AsyncSelect = () => {

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [stations, setStations] = useState([]);
    const [selectedStations, setSelectedStations] = useState('');
    const [selectedSecond, setSelectedSecond] = useState('');
    const [selectedMinute, setSelectedMinute] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [showStations, setShowStations] = useState(false);
    const [linkList, setLinkList] = useState([]);

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

                const serv = response.data.data.map((item, index) => ({ id: index,   name: item.name, hasSup: item.has_supported_scrap }));
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
            if (selectedService==0) {
                alert('Выберите службу!  А то я Вам ничего не покажу!')
            }
            const response = await axios.get(`https://geoscope-vniia.ru/api/v1/streams?service_name=${selectedService}`,
             {
                headers: {
                    'ngrok-skip-browser-warning': '69420',
                    'Content-Type': 'application/json'
                },
            });
            console.log(response);
            console.log(response.data + "response data");
            const stationList = await Promise.all(response.data.data.map(async (item) => {
                return `${item.network}/${item.station}`;
            }));
            console.log(stationList)
            setStations(stationList);
            setShowStations(true);
            setStations(stationList)
            console.log(stations)
        } catch (error) {
            console.error('Ошибка при загрузке данных станций:', error);
        }
    };




    const clickBtnShowResult = async() => {
        const hourNum = Number(selectedHour)
        const minuteIntNum = Number(selectedMinute)
        const secondNum = Number(selectedSecond)
        const timeToRequest = Number((hourNum*3600) + (minuteIntNum*60) + secondNum);
        console.log(timeToRequest)
        console.log(typeof(selectedStations))

        try {
            if (timeToRequest == []) {
                alert('Выберите время! А то я Вам ничего не покажу!')
            } else {
                const {network, station} = divideString(selectedStations)
                console.log(network, station)
                const response = await axios.post(`https://geoscope-vniia.ru/api/v1/async_loader`, {
                    'service_name': `${selectedService}`,
                    'network': `${network}`,
                    'station': `${station}`,
                    'interval_sec': `${timeToRequest}`
                })
                console.log("response");
                console.log(response);
                console.log(response.data + "response data");
                const taskID = response.data.data.task_id;
                console.log(taskID)

                setLinkList(sendGetRequest(taskID, timeToRequest));
                console.log('ссылки ссылки')
                console.log(linkList )
            }
        }
        catch (error) {
            console.error('Ошибка ошибка ошибка аааааааа аааа аа а а!!!!:', error);
        }

    };

    const showLinks = () => {
        console.log(linkList)
        linkList.then(result => {
            const urlsArray = result.map(item => item);
            const iframe = document.getElementById('iframeForAsync')
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

            urlsArray.forEach(url => {
                const link = iframeDocument.createElement('a');
                link.href = url;
                link.textContent = url;
                link.target = "_blank";
                link.style.display = 'block';
                iframeDocument.body.appendChild(link);
            });
            console.log(urlsArray);
        });

    }

    return (
        <div>
            <SelectService onChange={(e) => setSelectedService(e.target.value)}
                           services={services}
                           selectedService={selectedService}
            />

            <button onClick={clickBtnShowStations}>Показать станции</button>

            {showStations && (
                <select
                    value={selectedStations}
                    onChange={(e) => setSelectedStations(e.target.value)}
                >
                    <option value="">Выберите станцию</option>
                    {stations.map((station, index) => (
                        <option key={index} value={station}>{station}</option>
                    ))}
                </select>
            )}

            <SelectTime
               selectedHour={selectedHour}
               handleHourChange={handleHourChange}
               hours={hours}
               selectedMinute={selectedMinute}
               handleMinuteChange={handleMinuteChange}
               minutes={minutes}
               selectedSecond={selectedSecond}
               handleSecondChange={handleSecondChange}
               seconds={seconds}
           />
            <button onClick={clickBtnShowResult}> Начать загрузку данных </button>
            <button onClick={showLinks}> Вывести ссылки! </button>
            <iframe
                id="iframeForAsync"
                width="500"
                height="600"
                >
            </iframe>
        </div>
    );
};

export default AsyncSelect;
