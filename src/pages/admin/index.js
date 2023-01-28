import { Row, Col, Button,  } from 'antd';
import ContainerAdmin from '@/components/layouts/ContainerAdmin';
import { useTranslations } from 'next-intl';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState, useEffect } from 'react';
import PatientsRecordsRepository from '@/repositories/PatientRecordsRepository';


export default function Admin() {
    
    const [list, setList] = useState([]);
    // effects
    useEffect(()=> {
        PatientsRecordsRepository.getList({})
        .then((res)=>{
            const data = res.data
            setList(data?.data ??[])
            console.log("list",list)
        });
    }, [])

  const t = useTranslations('About');

  return (
    <ContainerAdmin title="Admin" >
      Admin Page
    </ContainerAdmin>
  )
}
