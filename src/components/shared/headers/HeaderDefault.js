import React from 'react';
import { Layout, Image, Row, Col, Dropdown, Typography, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import Link from "next/link";
const { Header } = Layout;

const headerStyle = {
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  zIndex: '1'
};
const HeaderDefault = ({ children }) => {
  const { locales, locale, pathname, query, asPath } = useRouter();
  
    return (
      <Header style={headerStyle} className="bg-transparent text-white">
        <Row justify="end">
          <Col span="24" className='text-start'>
            <Link href='/' locale={locale}>
              <Image preview={false} src='/bg-prediction-logo.svg' width={'40px'} alt='logo'/>
            </Link>
          </Col>
        </Row>
      </Header>
    );
};

export default HeaderDefault;
