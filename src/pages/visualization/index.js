import ContainerAdmin from '@/components/layouts/ContainerAdmin';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import PatientsRecordsRepository from '@/repositories/PatientRecordsRepository';
import { Row, Col, Space, Table, Tag, Select, Typography, Divider } from 'antd';
import {Bar} from 'react-chartjs-2';
import { registerables, Chart } from "chart.js";
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
    const [topHigherLimitList, setTopHigherLimitList] = useState([]);
    const [topLimitList, setTopLimitList] = useState([]);
    const [bottomLimitList, setBottomLimitList] = useState([]);
    const [bottomLowerLimitList, setBottomLowerLimitList] = useState([]);
    
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
        setTopLimitList([])
        setBottomLimitList([])
        PatientsRecordsRepository.getDetail(selectedPatient)
        .then((res)=>{
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
            setTopHigherLimitList(Array(lenData).fill(250))
            setTopLimitList(Array(lenData).fill(180))
            setBottomLimitList(Array(lenData).fill(90))
            setBottomLowerLimitList(Array(lenData).fill(50))
            resdata = resdata.map((data,index)=>{return{...data,'key':index+1}})
            setList(resdata);
        });
    }, [selectedPatient])

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
          {
            label: t('upperRedFlagDesc'),
            fill: 'end',
            data: topHigherLimitList,
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
            label: t('upperYellowFlagDesc'),
            fill: 'end',
            data: topLimitList,
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
          
          {
            label: t('lowerRedFlagDesc'),
            fill: 'start',
            data: bottomLowerLimitList,
            type: 'line',
            backgroundColor: "rgba(220, 53, 100, 1)",
            pointHoverBackgroundColor: 'white',
            
            lineTension: 0.1,
            borderColor: 'red',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'red',
            pointBackgroundColor: 'rgba(220, 53, 100, 1)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderColor: 'rgba(0,0,0,1)',
            pointHoverBorderWidth: 0,
            pointRadius: 1,
            pointHitRadius: 10,
          },
          {
            label: t('lowerYellowFlagDesc'),
            fill: 'start',
            data: bottomLimitList,
            type: 'line',
            backgroundColor: "rgba(255, 255, 155, 1)",
            pointHoverBackgroundColor: 'white',
            
            lineTension: 0.1,
            borderColor: 'yellow',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'yellow',
            pointBackgroundColor: 'rgba(255, 255, 155, 1)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderColor: 'rgba(0,0,0,1)',
            pointHoverBorderWidth: 0,
            pointRadius: 1,
            pointHitRadius: 10,
          },
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
                {/* <Table columns={columns} dataSource={list} /> */}
                <Bar
                    data={dataLine}
                    // width={400}
                    height={600}
                    options={chartOptions}
                />
                </Col>
            </Row>
        </ContainerAdmin>
    )
}
