// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// const inter = Inter({ subsets: ['latin'] })
// import styles from '@/styles/Home.module.css'
import { Row, Col, Button } from 'antd';
import Container from '@/components/layouts/Container';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import Link from "next/link";


export default function Home() {
  const t = useTranslations('Home');
  const { locales, locale, pathname, query, asPath } = useRouter();

  return (
    <>
      <Container title="Home" >
            {/* <img src='/bg-home.png' style={{position:'absolute',top:'0',right:'0',bottom:'0',height:'100%'}} className='bg-home'/> */}
            <img src='/bg-home-bottom.png' style={{position:'absolute',left:'0',right:'0',bottom:'0',width:'100%',height:'40vh'}} />
            <Row justify="center" align="middle" className="centered">
                <Col span={24}>
                    <div className='text-center'>
                      <h1>{t('hello')}</h1>
                      <h1 className='text-main'>{t('bgtitle')}</h1>
                    </div>
                </Col>
                <Col span={24}>
                    <div className='text-center'>
                        <Link href='/admin' locale={locale}>
                          <Button type="primary" danger shape='round'>
                            {t('getprediction')}
                          </Button>
                        </Link>
                        <Link href='/about' locale={locale}>
                          <Button type="text" shape='round' className='ms-2'>
                            {t('about')}
                          </Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}