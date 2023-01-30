import React from 'react';
import { Layout, Image, Row, Col, Avatar, Button, Dropdown, Space, Menu } from 'antd';
import { UserOutlined, DownOutlined, SmileOutlined, AppstoreOutlined, MailOutlined, SettingOutlined  } from '@ant-design/icons';
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from "react";

const { Header } = Layout;


const headerStyle = {
  zIndex: 1,
  height: '50px',
  lineHeight: '50px',
  position: 'fixed', 
  width: '100%',
  top: 0
};

const HeaderAdmin = ({ children }) => {
  const [current, setCurrent] = useState('mail');

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
  
  const items_menu = [
    {
      label: (
        <Link href='/' locale={locale}>
        <Image preview={false} src='/bg-prediction-logo.svg' width={'auto'} height={'24px'} alt='logo'/>
      </Link>
      ),
      key: 'logo',
    },
    {
      label: (
        <Link href='/admin' locale={locale}>
          <Button type="text" danger={pathname==='/admin'?true:false} className='ms-2'>
            {t('home')}
          </Button>
        </Link>
      ),
      key: 'home',
    },
    {
      label: (
        <Link href='/get-prediction' locale={locale}>
          <Button type="text" className='ms-2' danger={pathname==='/get-prediction'?true:false} >
            {t('getprediction')}
          </Button>
        </Link>
      ),
      key: 'getprediction',
    },
    {
      label: (
        <Link href='/data' locale={locale}>
          <Button type="text" danger={pathname==='/data'?true:false} className='ms-2'>
            {t('datasource')}
          </Button>
        </Link>
      ),
      key: 'data',
    },
    {
      label: (
        <Link href='/visualization' locale={locale}>
          <Button type="text" danger={pathname==='/visualization'?true:false} className='ms-2'>
            {t('visualization')}
          </Button>
        </Link>
      ),
      key: 'visualization',
    },
  ];

    const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
    return (
      <Header style={headerStyle} className="bg-white px-4">
        <div
          style={{
            float: 'right',
            width: 'auto',
            height: 31,
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0.2)',
            padding:0,
            margin:0
          }}
        >
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
        </div >
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items_menu} />
        
      </Header>
    );
};

export default HeaderAdmin;
