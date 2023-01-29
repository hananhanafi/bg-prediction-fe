import ContainerAdmin from '@/components/layouts/ContainerAdmin';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import PatientsRecordsRepository from '@/repositories/PatientRecordsRepository';


export default function Data() {
    
    const [list, setList] = useState([]);
    const [patientIdlist, setPatientIdList] = useState([]);
    // effects
    useEffect(()=> {
        PatientsRecordsRepository.getList({})
        .then((res)=>{
            const data = res.data
            setList(data?.data ??[])
            console.log("list",list)
        });
        PatientsRecordsRepository.getIdList({})
        .then((res)=>{
            const data = res.data
            setPatientIdList(data?.data ??[])
        });
    }, [])

  const t = useTranslations('Data');

  return (
    <ContainerAdmin title={t('datasource')} breadcrumb={['home','datasource']}>
      Data Page
    </ContainerAdmin>
  )
}
