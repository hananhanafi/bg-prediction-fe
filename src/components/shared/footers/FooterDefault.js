import React from 'react';
import { Layout, Dropdown, Row, Col, Typography, Space } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import Link from "next/link";
import Image from 'next/image'

const { Footer} = Layout;
import {
  HeartOutlined,
} from '@ant-design/icons';

const footerStyle = {
  textAlign: 'center',
  zIndex: 99
};

const FooterDefault = ({ children }) => {
    const t = useTranslations('Footer');
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
            <div className='text-center'>
              <Image src={'/flags/'+loc+'.png'} width={20} height={12} className='me-2' alt={loc}></Image>{loc.toUpperCase()}
            </div>
          </Link>
        )
      }
    })

    return (
      <Footer style={footerStyle} className="bg-danger text-white p-2">
        {t('madeWith')} <HeartOutlined style={{verticalAlign:'0'}}/> {t('by')} Hanafi | 
        <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: [locale],
          }}
          className='ms-2'
        >
          <Typography.Link style={{color:'#fff'}}>
            <Space>
              {t('language')}
              <Image src={'/flags/'+locale+'.png'} width={20} height={12} alt={locale}></Image>
            </Space>
          </Typography.Link>
        </Dropdown>
      </Footer>
    );
};

export default FooterDefault;
