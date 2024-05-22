import React, {useEffect, useState} from 'react';
import {SelectService} from "../components/SelectService";
import {SelectTime} from "../components/SelectTime";
import {divideString, hours, minutes, seconds, sendGetRequest} from "../store/store";
import axios from "axios";
import {
    AsyncH1, AsyncWrapper, PConnection, PConnectionStyled, StyledAsync, StyledButtonAsync, StyledButtonAsyncBigger,
    StyledButtonSync, StyledDataList, StyledGrayWrapper, StyledIframe,
    StyledSelectService,
    StyledSync, StyledSyncSelectServices, StyledTable,
    StyledTextSync, StyledTimerAsync, StyledTimerAsyncContainer
} from "../components/styles/StyledAsync";
import {
    ImgContainerStyled, ImgStyled,
    StyledDataTimeInput,
    StyledIframeSync,
    StyledResultSync
} from "../components/styles/StyledSync";
import imgNoData from "../assets/degree.png"

const AsyncSelect = () => {

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [stations, setStations] = useState([]);
    const [selectedStations, setSelectedStations] = useState('');
    const [selectedSecond, setSelectedSecond] = useState('');
    const [selectedMinute, setSelectedMinute] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [port, setPort] = useState('');
    const [host, setHost] = useState('');
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('https://geo-scope.ru/api/v1/services', {
                    headers: {
                        'ngrok-skip-browser-warning': '69420'
                    }
                });

                console.log(response.data);

                const serv = response.data.data.map((item, index) => ({ id: index,   name: item.name, hasSup: item.has_supported_scrap, hasDist: item.has_supported_dist, host: item.connection.host, port: item.connection.port }));
                setServices(serv);



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
    useEffect(() => {
        const selectedServiceInfo = services.find((service) => service.name === selectedService);
        if (selectedServiceInfo) {
            const { host, port } = selectedServiceInfo;
            setTextConnection(`Подключение: ${host}:${port}`);
        }
    }, [services, selectedService])

    const handleHourChange = (event) => {
        setSelectedHour(event.target.value);
    };

    const handleMinuteChange = (event) => {
        setSelectedMinute(event.target.value);
    };
    const handleSecondChange = (event) => {
        setSelectedSecond(event.target.value);
    };

    const clickBtnShowStations = async () => {
        try {
            console.log(selectedService)
            const response = await axios.get(`https://geo-scope.ru/api/v1/streams?service_name=${selectedService}`,
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
            const myElement = document.getElementById('inputDisA');
            myElement.disabled = false;
            myElement.value = '';
            setSelectedStations(myElement.value);
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
                const response = await axios.post(`https://geo-scope.ru/api/v1/async_loader`, {
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

    let urlFile = '';
    let urlImg = '';
    async function sendGetRequest(taskId, timeToRequest) {
        let responseValue = '';
        while (responseValue !== 'finished') {
            try {
                const response = await axios.get(`https://geo-scope.ru/api/v1/async_loader`, {
                    headers: {
                        'ngrok-skip-browser-warning': '69420',
                    },
                    params: {
                        'task_id': taskId,
                    }
                });
                responseValue = response.data.data.status;
                console.log(responseValue)
                if (response.data.data.result.file) {
                    urlFile = response.data.data.result.file;
                    urlImg = response.data.data.result.waveform_data;
                }

                if (responseValue === 'finished') {
                    showLinks();
                }
            } catch (error) {
                console.error('Произошла ошибка запроса:', error.message);
            }
            await new Promise((resolve) => setTimeout(resolve, timeToRequest * 1000 / 2));
        }

        console.log('Значение изменилось на "finished".');
    }
    const showLinks = () => {
        if (urlFile.length > 0) {
            const iframe = document.getElementById('iframeForSyncA');
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            iframeDocument.body.innerHTML = `<a href="${urlFile}">${urlFile}</a>`;

        } else {
            console.log('Нет данных для отображения');
        }

        if (urlImg.length > 0) {
            const containerImage = document.getElementById('imgContainerA');
            let img = containerImage.querySelector('img');

            if (!img) {

                img = document.createElement('img');
                containerImage.appendChild(img);
            }

            var delElA = document.getElementById('noDataAsyncSelect');
            delElA.remove();
            var delElImg = document.getElementById('noDataImgAsync')
            delElImg.remove();
            img.src = `data:image/jpeg;base64,${urlImg}`;
            img.width="400";
            img.height="400";

        }

    }



    const [textConnection, setTextConnection] = useState("Подключениe не установлено");
    return (
        <StyledAsync>
            <StyledGrayWrapper>
            <AsyncH1> Непрерывные данные </AsyncH1>
                <SelectService onChange={(e) => {
                    setSelectedService(e.target.value);
                    const myElement = document.getElementById('inputDisA');
                    myElement.disabled = true;
                    myElement.value = '';
                    setSelectedStations(myElement.value);


                }}
                               services={services}
                               selectedService={selectedService}
                />

            </StyledGrayWrapper>
            <PConnection >{textConnection}</PConnection>
                <StyledDataTimeInput
                    list="stationList"
                    value={selectedStations}
                    onChange={(e) => setSelectedStations(e.target.value)}
                    id = "inputDisA"
                    placeholder="Выберите или введите станцию"

                />
                <datalist id="stationList">
                    {stations.map((station, index) => (
                        <option key={index} value={station} />
                    ))}
                </datalist>



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
            <StyledResultSync>
                <ImgContainerStyled>
                    <img id = "noDataImgAsync"src={imgNoData} style={{height: 40 + 'px', width: 40 + "px"}}/>
                    <ImgStyled id = "imgContainerA">

                    </ImgStyled>
                    <PConnectionStyled id = "noDataAsyncSelect"> <p> <b>Нет данных для построения <br/> волновой формы</b> </p>

                        <p>Укажите параметры для скачивания<br/> сейсмоданных</p> </PConnectionStyled>
                </ImgContainerStyled>
                <StyledIframeSync
                    srcdoc="<p>Данных нет</p>"
                    id="iframeForSyncA"
                    width="400"
                    height="70"
                >
                </StyledIframeSync>
            </StyledResultSync>


        </StyledAsync>
    );
};

export default AsyncSelect;
