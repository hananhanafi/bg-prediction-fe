import Container from '@/components/layouts/Container';
import { Row, Col, Card, Button, Checkbox, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';

// const inter = Inter({ subsets: ['latin'] })
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


const rowStyle = { 
    position: 'absolute', 
    width: '100%', 
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};
export default function Home() {
    const t = useTranslations('Login');
    return (
    <>
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
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 6,
                                }}
                                // labelAlign="right"
                                wrapperCol={{
                                    span: 18,
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
                                        message: 'Please input your username!',
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
                                        message: 'Please input your password!',
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
                                    <Button type="text" dark className='me-2'>
                                        {t('register')}
                                    </Button>
                                    <Button type="primary" htmlType="submit" danger className='me-2'>
                                        {t('submit')}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}
