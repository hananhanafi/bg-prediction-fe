import React from 'react';
import { Layout, Image, Row, Col, Avatar, Button, Dropdown, Space } from 'antd';
import { UserOutlined, DownOutlined, SmileOutlined  } from '@ant-design/icons';
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from "react";

const { Header } = Layout;


const headerStyle = {
  zIndex: '1',
  height: '50px',
  lineHeight: '50px'
};
const HeaderAdmin = ({ children }) => {
  const t = useTranslations('Header');
  const { locales, locale, pathname, query, asPath } = useRouter();
  const router = useRouter()
  const { data: session, status: status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session && status !== 'loading') { 
      setUser(session.user)
    }
  }, [session,status])

  const items = [
    {
      key: '1',
      danger: true,
      label: (
        <Link 
          href='/api/auth/signout' 
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }} locale={locale} 
          style={{textDecoration:'none'}}
        >
          {t('logout')}
        </Link>
      ),
    },
  ];
 
    return (
      <Header style={headerStyle} className="bg-white">
        <Row justify="end">
          <Col span="20" className='text-start'>
            <Link href='/' locale={locale}>
              <Image preview={false} src='/bg-prediction-logo.svg' width={'auto'} height={'24px'} alt='logo'/>
            </Link>
            <Link href='/' locale={locale}>
              <Button type="text" className='ms-2'>
                {t('home')}
              </Button>
            </Link>
            <Link href='/' locale={locale}>
              <Button type="text" className='ms-2'>
                {t('getprediction')}
              </Button>
            </Link>
            <Link href='/' locale={locale}>
              <Button type="text" className='ms-2'>
                {t('datasource')}
              </Button>
            </Link>
            <Link href='/' locale={locale}>
              <Button type="text" className='ms-2'>
                {t('visualization')}
              </Button>
            </Link>
          </Col>
          <Col span="4" className='text-end'>
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()} style={{textDecoration:'none',color:'#000'}}>
                <Space>
                <Avatar src={user?.image ?? ''} size={24}/> {user?.name ?? ''}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    );
};

export default HeaderAdmin;
