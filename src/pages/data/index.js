import ContainerAdmin from '@/components/layouts/ContainerAdmin';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import PatientsRecordsRepository from '@/repositories/PatientRecordsRepository';
import { Row, Col, Space, Table, Tag, Select, Typography, Divider, Skeleton } from 'antd';
import {Bar} from 'react-chartjs-2';
import { registerables, Chart } from "chart.js";
Chart.register(...registerables);


const chartOptions = {
  responsive: true,
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
      // title: {
      //   text: "Report",
      //   display: true,
      //   color: "#000",
      //   font: {
      //     size: 18,
      //   }
      // }
    }
  },
  // scales: {
  //   xAxes: {
  //     display: true,
  //     title: {
  //       display: true,
  //       text: 'Your Title'
  //     }
  //   },
  //   yAxis: {
  //     max: 400
  //   }
  // },
  // elements: {
  //   bar: {
  //     barPercentage: 0.3,
  //     categoryPercentage: 1
  //   }
  // }
}


export default function Data() {
  const t = useTranslations('Data');
  const [list, setList] = useState([]);
  const [patientIdlist, setPatientIdList] = useState([]);
  const [histogramDataLabel, setHistogramDataLabel] = useState([]);
  const [histogramData, setHistogramData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(1);
  const [minData, setMinData] = useState(0);
  const [maxData, setMaxData] = useState(0);
  const [averageData, setAverageData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
      ellipsis: true,
    },
    {
      title: t('datetime'),
      dataIndex: 'bg_datetime',
      key: 'bg_datetime',
    },
    {
      title: t('bloodGlucoseLevel')+' (mg/dL)',
      dataIndex: 'bg_level',
      key: 'bg_level',
    },
  ];
  
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
      setIsLoading(true);
      PatientsRecordsRepository.getDetail(selectedPatient)
      .then((res)=>{
          const data = res.data;
          let resdata = data?.data ??[];
          setMinData(Math.min(...resdata.map(o => o.bg_level)));
          setMaxData(Math.max(...resdata.map(o => o.bg_level)));
          setAverageData(Math.round(resdata.reduce((total,next)=>total+next.bg_level,0)/resdata.length));

          const minLevel = Math.floor(Math.min(...resdata.map(o => o.bg_level))/10)*10
          const maxLevel = Math.floor(Math.max(...resdata.map(o => o.bg_level))/10)*10

          setHistogramDataLabel([]);
          setHistogramData([]);
          for (let level = minLevel; level <= maxLevel; level+=10) {
            const findData = resdata.filter((data)=>{return level<=data.bg_level&&data.bg_level<=level+10});
            const lenData = findData.length;
            setHistogramDataLabel(oldArray => [...oldArray,level]);
            setHistogramData(oldArray => [...oldArray,lenData]);
          }
          resdata = resdata.map((data,index)=>{return{...data,'key':index+1}})
          setList(resdata);
          setIsLoading(false);
      })
      .catch((e)=>{
        setIsLoading(false);
      });
  }, [selectedPatient])
  
  const dataHistogram = {
    labels: histogramDataLabel,
    datasets: [
      {
        label: t('amountofData'),
        borderRadius: 32,
        data: histogramData,
        backgroundColor: "rgba(220, 53, 69, 1)",
        borderColor: 'red',
        borderWidth: {
          bottom: 0,
          top: 1,
          left: 1,
          right: 1
        },
        barThickness: 40,
        
      },
    ]
  }

  const handleChange = (value) => {
    setSelectedPatient(value)
  };
  
  return (
    <ContainerAdmin title={t('datasource')} breadcrumb={['home','datasource']}>
      <Row justify="start" align="top" className='mb-4'> 
        <Col xs={24} sm={12} md={16}>
          <Typography.Title level={3}>
            {t('historyData')}
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
          <Table id='table-data-source' columns={columns} dataSource={list} loading={isLoading}/>
        </Col>
      </Row>
      <Divider/>
      <Row justify="center" align="middle"> 
        <Col span={24}>
          <Typography.Title level={3}>
            {t('dataDistribution')}
          </Typography.Title>
        </Col>
        <Col span={24} className='mb-4'>
          <table>
            <tbody>
              <tr>
                <td>Min</td>
                <td> : </td>
                <td>{minData}</td>
              </tr>
              <tr>
                <td>Max</td>
                <td> : </td>
                <td>{maxData}</td>
              </tr>
              <tr>
                <td>Average</td>
                <td> : </td>
                <td>{averageData}</td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col span={24}>
          <Bar
            id='bar-chart-data-distribution'
            data={dataHistogram}
            height={400}
            options={chartOptions}
          />
        </Col>
      </Row>
    </ContainerAdmin>
  )
}
