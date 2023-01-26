import { Row, Col, Button,  } from 'antd';
import Container from '@/components/layouts/Container';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('About');
  return (
    <>
      <Container title="Login" >
            <Row justify="center" align="middle" className="centered">
                <Col span={20}>
                    <div className='ms-4'>
                      <h1>{t('about')}</h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}
