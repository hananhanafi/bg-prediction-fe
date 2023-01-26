import React from 'react';
import { Layout } from 'antd';
import { useTranslations } from 'next-intl';
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

    return (
      <Footer style={footerStyle} className="bg-danger text-white p-2">{t('madeWith')} <HeartOutlined style={{verticalAlign:'0'}}/> {t('by')} Hanafi</Footer>
    );
};

export default FooterDefault;
