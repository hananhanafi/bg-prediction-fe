import ContainerAdmin from '@/components/layouts/ContainerAdmin';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import PatientsRecordsRepository from '@/repositories/PatientRecordsRepository';


export default function GetPrediction() {
    
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

    const t = useTranslations('GetPrediction');

    return (
        <ContainerAdmin title={t('getprediction')}  breadcrumb={['home','getprediction']}>
            Get Prediction Page
        </ContainerAdmin>
    )
}
