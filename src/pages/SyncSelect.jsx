import React, {useEffect, useState} from 'react';
import axios from "axios";
import {SelectService} from "../components/SelectService";
import {divideString} from "../store/store";

export const SyncSelect = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [stations, setStations] = useState([]);
    const [selectedStations, setSelectedStations] = useState('');
    const [showStations, setShowStations] = useState(false);



    const [firstDate, setFirstDate] = useState('');
    const [secondDate, setSecondDate] = useState('');
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
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('https://geoscope-vniia.ru/api/v1/services', {
                    headers: {
                        'ngrok-skip-browser-warning': '69420'
                    }
                });

                const serv = response.data.data.map((item, index) => ({ id: index,   name: item.name, hasSup: item.has_supported_scrap }));
                const filteredServ = serv.filter(item => item.hasSup === true);
                console.log(filteredServ);
                setServices(filteredServ)

            } catch (error) {
                console.error('Произошла ошибка запроса:', error);
            }
        };

        fetchServices();
    }, []);
    let linkList = '';
    let pict = '';

    const ShowResult = () => {
        if (linkList.length > 0) {
            const iframe = document.getElementById('iframeForSync');
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            iframeDocument.body.innerHTML = `<a href="${linkList}">${linkList}</a>`;

        } else {
            console.log('Нет данных для отображения');
        }

        if (pict.length > 0) {
            const containerImage = document.getElementById('imgContainer');
            let img = containerImage.querySelector('img');

            if (!img) {
                img = document.createElement('img');
                containerImage.appendChild(img);
            }

            img.src = `data:image/jpeg;base64,${pict}`;
        }
    };

    const sendReq = async() => {

        let firstDayValue = document.getElementById('firstDay').value;
        let firstMonthValue = document.getElementById('firstMonth').value;
        let firstHourValue = document.getElementById('firstHour').value;
        let firstMinValue = document.getElementById('firstMinute').value;
        let firstSecValue = document.getElementById('firstSec').value;
        let secondDayValue = document.getElementById('secondDay').value;
        let secondMonthValue = document.getElementById('secondMonth').value;
        let secondHourValue = document.getElementById('secondHour').value;
        let secondMinValue = document.getElementById('secondMinute').value;
        let secondSecValue = document.getElementById('secondSec').value;
        if (!firstDayValue || !firstMonthValue || !secondDayValue || !secondMonthValue) {
            console.log("Введите все значения");
            console.log(firstDate)
            console.log(secondDate)
            return;
        } else {
            const f = `2024-${firstMonthValue}-${firstDayValue}T${firstHourValue}:${firstMinValue}:${firstSecValue}`
            const s = `2024-${secondMonthValue}-${secondDayValue}T${secondHourValue}:${secondMinValue}:${secondSecValue}`;
            console.log(firstHourValue, firstMinValue,  firstSecValue)
            console.log(f)
            console.log(s)
            const {network, station} =  divideString(selectedStations)
            const response = await axios.post(`https://geoscope-vniia.ru/api/v1/sync_loader`, {
                'service_name': `${selectedService}`,
                'network': `${network}`,
                'station': `${station}`,
                'left_time': `${f}`,
                'right_time': `${s}`
            }, {
                headers: {
                    'ngrok-skip-browser-warning': '69420',
                    'Content-Type': 'application/json'
                },

            });

            console.log(response.data.data + "response data");
            if (response.data.data.file) {
                linkList = response.data.data.file;
                pict = response.data.data.waveform_data;
                console.log('In IF')
                console.log(linkList)
                console.log(pict)
                ShowResult()
            }
        }





    }
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    today = `${day}.0${month}`
    return (
        <div>

            <div>Синхронные запросы рассчитаны только на 2024 год.</div>
            <div>Введите дату и время от 01.01 с которой начинается получение данных. </div>
            <input type="text" id="firstDay" name="" placeholder="Введите день" pattern=""/>
            <input type="text" id="firstMonth" name="" placeholder="Введите месяц" pattern=""/>
            <input type="text" id="firstHour" name="" placeholder="Введите час" pattern=""/>
            <input type="text" id="firstMinute" name="" placeholder="Введите минуту" pattern=""/>
            <input type="text" id="firstSec" name="" placeholder="Введите секунду" pattern=""/>
            <div>Введите дату и время до {today} с которой начинается получение данных. </div>
            <input type="text" id="secondDay" name="" placeholder="Введите день" pattern=""/>
            <input type="text" id="secondMonth" name="" placeholder="Введите месяц" pattern=""/>
            <input type="text" id="secondHour" name="" placeholder="Введите час" pattern=""/>
            <input type="text" id="secondMinute" name="" placeholder="Введите минуту" pattern=""/>
            <input type="text" id="secondSec" name="" placeholder="Введите секунду" pattern=""/>
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
            <br/>
            <button onClick={sendReq}>Получить данные</button>

            {/*Временные ворота задавать (не просто день, но и время,
            пример: 2010-02-27T06:30:00, где 2010 - год, 02- месяц, 27 - число,
             06 - час, 30 - минуты, 00 - секунды, время задается в UTC)*/}
            <div>
                <iframe
                    id="iframeForSync"
                    width="400"
                    height="100"
                >
                </iframe>

                <div id="imgContainer">

                </div>
            </div>
        </div>
    );
};

