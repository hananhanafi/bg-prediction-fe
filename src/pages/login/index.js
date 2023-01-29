import Container from '@/components/layouts/Container';
import { Row, Col, Card, Button, Form, Input, Divider } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react'
import { getCsrfToken, getProviders, useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";
import Image from 'next/image'

// const inter = Inter({ subsets: ['latin'] })
// const onFinish = (values) => {
//     console.log('Success:', values);
// };
// const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
// };

const rowStyle = { 
    position: 'absolute', 
    width: '100%', 
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export default function Login() {
    const t = useTranslations('Login');
    const router = useRouter()
    const { data: session, status: status } = useSession()
    const [providers, setProviders] = useState(null);
    const [csrfToken, setCsrfToken] = useState(null);
    
    useEffect(() => {
        if (session && status !== 'loading') { 
            router.push('/admin') 
        }
        // declare the data fetching function
        const fetchData = async () => {
            if (status !== 'loading') {
              if (await providers === null) {
                setProviders(await getProviders());
                if (await csrfToken === null) {
                  setCsrfToken(await getCsrfToken());
                }
              }
            }
        }
        // call the function
        fetchData()
        // make sure to catch any error
        .catch(console.error);
        // console.log("pr",providers)
    }, [session,status,providers,csrfToken])


    return (
    <Container title="Login" >
        <Row justify="center" align="middle" style={rowStyle}>
            <Col xs={22} sm={16} md={14} lg={12} xl={8} >
                <div className="site-card-border-less-wrapper">
                    <Card
                        title={t('login')}
                        bordered={false}
                        className="bg-danger"
                        headStyle={{color: '#fff'}}
                        bodyStyle={{background:'#fff'}}
                    >
                        {/* <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            labelAlign="left"
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                            remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label={t('username')}
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: t('pleaseInputYour',{name:t('username')}),
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label={t('password')}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: t('pleaseInputYour',{name:t('password')}),
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    span: 24,
                                }}
                                style={{textAlign:'right'}}
                            >
                                <Button type="text" className='me-2'>
                                    {t('register')}
                                </Button>
                                <Button type="primary" htmlType="submit" danger className='me-2'>
                                    {t('submit')}
                                </Button>
                            </Form.Item>
                        </Form> */}
                        <Row justify="center" align="middle" className="text-center"> 
                            {/* <Col span={24}>
                                <Divider>{t('or')}</Divider>
                            </Col> */}
                            <Col span={24}>
                                {providers && Object.values(providers).map((provider) => {
                                    return (
                                    <div key={provider.name}>
                                        <Button size='large' onClick={() => signIn(provider.id)} className='w-100 mb-2'>
                                            {t('continueWith')} {provider.name} <Image src={('/'+provider.id+'-icon.png')} width={20} height={20} className='ms-2' alt={provider.name}></Image>
                                        </Button>
                                    </div>
                                    );
                                })}
                            </Col>
                        </Row>   
                    </Card>
                </div>
            </Col>
        </Row>
    </Container>
  )
}
