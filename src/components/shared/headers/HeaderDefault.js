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
  const items = locales.map(loc=>{
    return {
      key: loc,
      // label: loc
      label: (
        <Link
          key={loc}
          href={{ pathname, query }}
          as={asPath}
          locale={loc}
        >
          <img src={'/flags/'+loc+'.png'} width="20px" className='me-2'></img>{loc}
         </Link>
      )
    }
  })
    return (
      <Header style={headerStyle} className="bg-transparent text-white py-2 px-4">
        <Row justify="end">
          <Col span="12" className='text-start'>
            <Link href='/' locale={locale}>
              <Image preview={false} src='/bg-prediction-logo.svg' width={'40px'}/>
            </Link>
          </Col>
          <Col span="12" className='text-end'>
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: [locale],
              }}
            >
              <Typography.Link>
                <Space>
                  Language
                  <DownOutlined />
                </Space>
              </Typography.Link>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    );
};

export default HeaderDefault;
