import ContainerAdmin from '@/components/layouts/ContainerAdmin';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import PatientsRecordsRepository from '@/repositories/PatientRecordsRepository';
import { Row, Col, Space, Table, Tag, Select, Typography, Divider } from 'antd';
import {Line} from 'react-chartjs-2';
import { registerables, Chart } from "chart.js";
import moment from 'moment';

Chart.register(...registerables);

export default function Visualization() {
    

    const t = useTranslations('Visualization');
    const [list, setList] = useState([]);
    const [patientIdlist, setPatientIdList] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(1);
    const [minData, setMinData] = useState(0);
    const [maxData, setMaxData] = useState(0);
    const [averageData, setAverageData] = useState(0);
    const [lineDataLabel, setLineDataLabel] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [hyperglycemiaLimitList, setHyperglycemiaLimitList] = useState([]);
    const [hypoglycemiaLimitList, setHypoglycemiaLimitList] = useState([]);
    
    const [dataToPredict, setDataToPredict] = useState([]);
    const [predictedData, setpredictedData] = useState([]);
    const [predictedlineDataLabel, setPredictedLineDataLabel] = useState([]);
    const [predictedlineDataChart, setPredictedLineDataChart] = useState([]);
    const [lastDate, setlastDate] = useState(new Date());

    const addMinutes = (date, minutes) => {
        date.setMinutes(date.getMinutes() + minutes);
      
        return date;
    }

    // effects
    useEffect(()=> {
        PatientsRecordsRepository.getIdList({})
        .then((res)=>{
            const data = res.data
            let resdata = data?.data ??[];
            resdata = resdata.map((data)=>{return{value:data,label:data}})
            setPatientIdList(resdata)
        });
    }, [])
    useEffect(()=> {
        PatientsRecordsRepository.getDetail(selectedPatient)
        .then(async (res)=>{
            const data = res.data;
            let resdata = data?.data ??[];
            const lenData = resdata.length;
            setMinData(Math.min(...resdata.map(o => o.bg_level)));
            setMaxData(Math.max(...resdata.map(o => o.bg_level)));
            setAverageData(Math.round(resdata.reduce((total,next)=>total+next.bg_level,0)/resdata.length));
            
            const bgDateTimeArr = resdata.map((data)=>{return data.bg_datetime})
            const bgLevelArr = resdata.map((data)=>{return data.bg_level})
            setLineDataLabel(bgDateTimeArr);
            setLineData(bgLevelArr);
            setHyperglycemiaLimitList(Array(lenData).fill(180))
            setHypoglycemiaLimitList(Array(lenData).fill(70))
            resdata = resdata.map((data,index)=>{return{...data,'key':index+1}})
            setList(resdata);
            const last6Data = resdata.slice(resdata.length-6,resdata.length);
            setDataToPredict(new Array(last6Data.map(data=>{return data.bg_level})));
            setlastDate(new Date(last6Data[last6Data.length-1].bg_datetime));
            return () => {
                // cancel 
                setHypoglycemiaLimitList([]);
                setHyperglycemiaLimitList([]);
                setDataToPredict([]);
            };
        });
    }, [selectedPatient])

    useEffect(()=>{
        predictData();
        return () => {
            // cancel 
            console.log("clean")
            setpredictedData([]);
            setPredictedLineDataLabel([]);
            setPredictedLineDataChart([]);
        };
    }
    ,[dataToPredict])

    const predictData = async () => {
        if(dataToPredict[0]){
            const payloadPredict = {
                "data": dataToPredict,
                "ph": 12
            }
            await PatientsRecordsRepository.predict(payloadPredict).then((resPred)=>{
                const predict = resPred.data?.data ?? 0;
                const remapPredict = predict.map((pred,index)=>{
                    return {
                        "pt_id": selectedPatient,
                        "key": index+1,
                        "bg_level": pred,
                        "bg_datetime": moment(addMinutes(lastDate,5)).format("YYYY-MM-DD HH:mm:ss"),
                    }
                })
                const labels = remapPredict.map((pred)=>{return pred.bg_datetime})
                setPredictedLineDataLabel(labels);
                setPredictedLineDataChart(predict);
                setpredictedData(remapPredict);
            })
        }
    }

    const handleChange = (value) => {
        setSelectedPatient(value)
    };

    
    const chartOptions = {
        responsive: true,
        // interaction: {
        //   mode: 'index',
        //   intersect: false,
        // },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                    position: "top",
                    align: "center",
                    labels: {
                    boxWidth: 7,
                    usePointStyle: true,
                    pointStyle: "circle",
                },
            },
        },
        scales: {
            y: {
                max: maxData+50,
                title: {
                    display: true,
                    text: t('bloodGlucoseLevel')+' (mg/dL)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: t('datetime')
                }
            }
        },
    }

    const limitDatasets = [
        {
            label: t('hyperglycemiaDescription'),
            fill: 'end',
            data: hyperglycemiaLimitList,
            type: 'line',
            backgroundColor: "rgba(220, 53, 69, 1)",
            pointHoverBackgroundColor: 'white',
            
            lineTension: 0.1,
            borderColor: 'red',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'red',
            pointBackgroundColor: 'rgba(220, 53, 69, 1)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderColor: 'rgba(255,255,255,1)',
            pointHoverBorderWidth: 0,
            pointRadius: 1,
            pointHitRadius: 10,
          },
          {
            label: t('hypoglycemiaDescription'),
            fill: 'start',
            data: hypoglycemiaLimitList,
            type: 'line',
            backgroundColor: "rgba(255, 220, 50, 1)",
            pointHoverBackgroundColor: 'white',
            
            lineTension: 0.1,
            borderColor: 'yellow',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'yellow',
            pointBackgroundColor: 'rgba(255, 220, 50, 1)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderColor: 'rgba(0,0,0,1)',
            pointHoverBorderWidth: 0,
            pointRadius: 1,
            pointHitRadius: 10,
          },
    ]

    const dataLine = {
        labels: lineDataLabel,
        datasets: [
          {
            label: t('bloodGlucoseLevel')+' (mg/dL)',
            fill: false,
            lineTension: 0.1,
            // backgroundColor: "rgba(220, 53, 69, 1)",
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderColor: 'rgba(0, 0, 0, .8)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'black',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'black',
            pointHoverBorderColor: 'rgba(255,255,255,1)',
            pointHoverBorderWidth: 0,
            pointRadius: 1,
            pointHitRadius: 10,
            data: lineData,
            type: 'line',
          },
          ...limitDatasets
        ]
    };


    const dataLinePredicted = {
        labels: predictedlineDataLabel,
        datasets: [
          {
            label: t('bloodGlucoseLevel')+' (mg/dL)',
            fill: false,
            lineTension: 0.1,
            // backgroundColor: "rgba(220, 53, 69, 1)",
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderColor: 'rgba(0, 0, 0, .8)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'black',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'black',
            pointHoverBorderColor: 'rgba(255,255,255,1)',
            pointHoverBorderWidth: 0,
            pointRadius: 1,
            pointHitRadius: 10,
            data: predictedlineDataChart,
            type: 'line',
          },
          ...limitDatasets
        ]
    };
    return (
        <ContainerAdmin title={t('visualization')} breadcrumb={['home','visualization']}>
            <Row justify="start" align="top" className='mb-4'> 
                <Col xs={24} sm={12} md={16}>
                <Typography.Title level={3}>
                    {t('visualization')}
                </Typography.Title>
                <table className='mb-2'>
                    <tbody>
                    <tr>
                        <td>{t('patientid')}</td>
                        <td> : </td>
                        <td>{selectedPatient}</td>
                    </tr>
                    </tbody>
                </table>
                </Col>
                <Col xs={24} sm={12} md={8}>
                <label>{t('selectPatientid')}</label>
                <Select
                    placeholder="Select Patient ID"
                    defaultValue={selectedPatient}
                    style={{
                    width: '100%',
                    }}
                    onChange={handleChange}
                    options={patientIdlist}
                />
                </Col>
            </Row>
            <Row justify="center" align="middle"> 
                <Col span={24}>
                    <Line
                        id='chart-patient-bg-record'
                        data={dataLine}
                        // width={400}
                        height={600}
                        options={chartOptions}
                    />
                </Col>
                <Divider></Divider>
                <Col span={24} className='text-center'>
                    <Typography.Title level={3}>
                        {t('nextPredictionIn',{hours:1})}
                    </Typography.Title>
                </Col>
                <Col span={24}>
                    <Line
                        id='prediction-chart-patient-bg-record'
                        data={dataLinePredicted}
                        // width={400}
                        height={400}
                        options={{
                            ...chartOptions,
                            plugins: {
                                legend:{
                                    display:false
                                }
                            }
                        }}
                    />
                </Col>
            </Row>
        </ContainerAdmin>
    )
}
