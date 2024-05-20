import React, {useEffect, useState} from 'react';
import axios from "axios";
import {SelectService} from "../components/SelectService";
import {StyledButtonAsyncBigger, StyledSelectService} from "../components/styles/StyledAsync";
import {divideString} from "../store/store";
import {StyledDistanceDiv, StyledDistancePage, StyledInputDistance, StyledP} from "../components/styles/StyledDistance";
import {StyledH1Sync} from "../components/styles/StyledSync";

const GetDistance = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [stations, setStations] = useState([]);
    const [selectedStations, setSelectedStations] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [showResult, setShowResult] = useState(false)
    const [kilometrsDist, setKilometrsDist] = useState('Нет')
    const [degreesDist, setDegreesDist] = useState('Нет')
    const [iframeUrl, setIframeUrl] = useState('https://yandex.ru/map-widget/v1/')
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
                const filteredServ = serv.filter(item => item.hasDist === true);

                setServices(filteredServ);
            } catch (error) {
                console.error('Произошла ошибка запроса:', error);
            }
        };

        fetchServices();
    }, []);
    useEffect(() => {
        if (selectedService) {
            clickBtnShowStations();
        }
    }, [selectedService]);
    const changeLatitude = (event) => {
        setLatitude(Number(event.target.value));
    };
    const changeLongitude = (event) => {
        setLongitude(Number(event.target.value));

    };

    const showResultDistance = async () => {
        const long = longitude;
        const lat = latitude;
        const { network, station } = divideString(selectedStations);
        console.log(lat, long)
        try {
            if (long === '' || isNaN(long) || lat === '' || isNaN(lat)) {
                alert("Введите данные координаты")
            }
            else {
                const response = await axios.post(`https://geoscope-vniia.ru/api/v1/destination`, {
                    'service_name': selectedService,
                    'network': network,
                    'station': station,
                    'source_latitude': lat,
                    'source_longitude': long
                });
                console.log(response)
                if (response.data.status === 'success') {
                    setIframeUrl(response.data.data.on_map);
                    const kilometersDistances = response.data.data.kilometers;
                    const kilometrsDist =   kilometersDistances.toFixed(2);
                    setKilometrsDist(kilometrsDist);
                    const degreesDistances = response.data.data.degrees;
                    const degreesDist =   degreesDistances.toFixed(2);
                    setDegreesDist(degreesDist);
                    setShowResult(true)
                } else {
                    console.log("Ошибка, сервер вернул не успех ")
                }

            }
        } catch (error){

        }

    }

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

    return (
        <StyledDistancePage>
            <StyledH1Sync> Получение дистанции  </StyledH1Sync>

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
                <option value="">Выберите станцию</option>
                {stations.map((station, index) => (
                    <option key={index} value={station}>{station}</option>
                ))}
            </StyledSelectService>
            <StyledP>Введите долготу</StyledP>
            <StyledInputDistance onChange={changeLongitude} placeholder={"Введите долготу"}/>
            <StyledP>Введите широту</StyledP>
            <StyledInputDistance onChange={changeLatitude} placeholder={"Введите широту"}/>

            <StyledButtonAsyncBigger onClick={showResultDistance}> Получить данные</StyledButtonAsyncBigger>

           <StyledDistanceDiv>
               <StyledP>Расстояние в километрах: {kilometrsDist} </StyledP>
               <StyledP>Расстояние в градусах: {degreesDist} </StyledP>
                <iframe src={iframeUrl} width="300px" height="400px"/>
            </StyledDistanceDiv>
        </StyledDistancePage>
    );
};

export default GetDistance;