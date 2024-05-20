import React, {useEffect, useState} from 'react';
import axios from "axios";
import {SelectService} from "../components/SelectService";
import {divideString} from "../store/store";
import {
    imgContainerStyled,
    StyledDataTimeInput,
    StyledH1Sync,
    StyledIframeSync,
    StyledInputSync, StyledResultSync,
    StyledSyncForm,
    StyledSyncMain
} from "../components/styles/StyledSync";
import {
    StyledButtonAsync,
    StyledButtonAsyncBigger,
    StyledSelectService,
    StyledTextSync
} from "../components/styles/StyledAsync";

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

                const serv = response.data.data.map((item, index) => ({ id: index,   name: item.name, hasSup: item.has_supported_scrap,  hasDist: item.has_supported_dist }));
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
            img.width="400";
            img.height="400";

        }
    };

    const sendReq = async() => {

        const startDateInput = document.getElementById("startDate");
        if (!startDateInput) return;

        const startDate = new Date(startDateInput.value);

        const firstDayValue = startDate.getDate();
        const firstMonthValue = '0'+(startDate.getMonth() + 1);
        const firstHourValue = startDate.getHours();
        const firstMinValue = startDate.getMinutes();
        const firstSecValue = '01';
        console.log("Day: ", firstDayValue);
        console.log("Month: ", firstMonthValue);
        console.log("Hour: ", firstHourValue);
        console.log("Minute: ", firstMinValue);
        const endDateInput = document.getElementById("endDate");
        if (!endDateInput) return;

        const endDate = new Date(endDateInput.value);

        const secondDayValue = endDate.getDate();
        const secondMonthValue = '0'+(endDate.getMonth() + 1);
        const secondHourValue = endDate.getHours();
        const secondMinValue = endDate.getMinutes();
        const secondSecValue = '01';
        console.log("Day: ", secondDayValue);
        console.log("Month: ", secondMonthValue);
        console.log("Hour: ", secondHourValue);
        console.log("Minute: ", secondMinValue);
        // let firstDayValue = document.getElementById('firstDay').value;
        // let firstMonthValue = document.getElementById('firstMonth').value;
        // let firstHourValue = document.getElementById('firstHour').value;
        // let firstMinValue = document.getElementById('firstMinute').value;
        // let firstSecValue = '01'

        if (!firstDayValue || !firstMonthValue || !secondDayValue || !secondMonthValue  || !firstSecValue   || !secondSecValue) {
            alert("Введите все значения");
            console.log(firstDate)
            console.log(secondDate)
            return;
        } else {
            const leftTime = `2024-${firstMonthValue}-${firstDayValue}T${firstHourValue}:${firstMinValue}:${firstSecValue}`
            const rightTime = `2024-${secondMonthValue}-${secondDayValue}T${secondHourValue}:${secondMinValue}:${secondSecValue}`;
            console.log(firstHourValue, firstMinValue,  firstSecValue)
            console.log(leftTime)
            console.log(rightTime)
            const {network, station} =  divideString(selectedStations)
            const response = await axios.post(`https://geoscope-vniia.ru/api/v1/sync_loader`, {
                'service_name': `${selectedService}`,
                'network': `${network}`,
                'station': `${station}`,
                'left_time': `${leftTime}`,
                'right_time': `${rightTime}`
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
    useEffect(() => {
        if (selectedService) {
            clickBtnShowStations();
        }
    }, [selectedService]);
    return (
        <StyledSyncMain>

            <StyledH1Sync> Интервал времени </StyledH1Sync>


            <StyledDataTimeInput
                type={"datetime-local"}
                id="startDate"
                name="startDate"
                onChange={() => {
                    const startDateInput = document.getElementById("startDate");
                    const startDate = new Date(startDateInput.value);

                    const selectedDay = startDate.getDate();
                    const selectedMonth = startDate.getMonth() + 1;
                    const selectedYear = startDate.getFullYear();
                    const selectedHour = startDate.getHours();
                    const selectedMinute = startDate.getMinutes();

                    console.log("Day: ", selectedDay);
                    console.log("Month: ", selectedMonth);
                    console.log("Year: ", selectedYear);
                    console.log("Hour: ", selectedHour);
                    console.log("Minute: ", selectedMinute);

                    // const startDate = new Date(e.target.value);
                    // const firstDay = document.getElementById("firstDay");
                    // const firstMonth = document.getElementById("firstMonth");
                    // const firstHour = document.getElementById("firstHour");
                    // const firstMinute = document.getElementById("firstMinute");
                    //
                    // if (firstDay) firstDay.value = startDate.getDate();
                    // if (firstMonth) firstMonth.value = startDate.getMonth() + 1;
                    // if (firstHour) firstHour.value = startDate.getHours();
                    // if (firstMinute) firstMinute.value = startDate.getMinutes();
                    // console.log(firstDay,firstMonth, firstHour, firstMinute )
                }}
            />
            <StyledDataTimeInput
                type={"datetime-local"}
                id="endDate"
                name="endDate"
                onChange={(e) => {

                    // const endDate = new Date(e.target.value);
                    // const secondDay = document.getElementById("secondDay");
                    // const secondMonth = document.getElementById("secondMonth");
                    // const secondHour = document.getElementById("secondHour");
                    // const secondMinute = document.getElementById("secondMinute");
                    //
                    // if (secondDay) secondDay.value = endDate.getDate();
                    // if (secondMonth) secondMonth.value = endDate.getMonth() + 1;
                    // if (secondHour) secondHour.value = endDate.getHours();
                    // if (secondMinute) secondMinute.value = endDate.getMinutes();
                    // console.log(secondDay, secondMonth, secondHour, secondMinute)
                }}
            />

            <SelectService onChange={(e) => setSelectedService(e.target.value)}
                           services={services}
                           selectedService={selectedService}
            />

                <StyledSelectService
                    value={selectedStations}
                    onChange={(e) => setSelectedStations(e.target.value)}
                >
                    <option value="">Выберите станцию</option>
                    {stations.map((station, index) => (
                        <option key={index} value={station}>{station}</option>
                    ))}
                </StyledSelectService>
            <br/>
            <StyledButtonAsyncBigger onClick={sendReq}>Получить данные</StyledButtonAsyncBigger>

            {/*Временные ворота задавать (не просто день, но и время,
            пример: 2010-02-27T06:30:00, где 2010 - год, 02- месяц, 27 - число,
             06 - час, 30 - минуты, 00 - секунды, время задается в UTC)*/}
            <StyledResultSync>
                <imgContainerStyled id="imgContainer">

                </imgContainerStyled>
                <StyledIframeSync
                    id="iframeForSync"
                    width="400"
                    height="60"
                >
                </StyledIframeSync>
            </StyledResultSync>
        </StyledSyncMain>
    );
};

