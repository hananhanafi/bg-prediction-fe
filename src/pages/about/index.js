import { Row, Col, Button } from 'antd';
import Container from '@/components/layouts/Container';
import { useTranslations } from 'next-intl';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import Link from "next/link";

export default function About() {
  const t = useTranslations('About');
  const { locale } = useRouter();
  return (
    <Container title="About" >
      <Row justify="center" align="middle" className="centered">
        <Col span={20}>
          <div>
            <h1>{t('about')}</h1>
            <p>
              {t('aboutDesc')}
            </p>
          </div>
          <Link href='/' locale={locale}>
            <Button type="primary" shape='round' icon={<ArrowLeftOutlined />}>
              {t('back')}
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
