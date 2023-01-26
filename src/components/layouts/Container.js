import React from 'react';
// import { fadeIn } from '~/utilities/animation';
import { motion } from 'framer-motion';
import Head from 'next/head';
import HeaderDefault from '@/components/shared/headers/HeaderDefault';
import FooterDefault from '@/components/shared/footers/FooterDefault';
import { Layout, Space, theme } from 'antd';
const { Content } = Layout;
const contentStyle = {
    // textAlign: 'center',
    // minHeight: 120,
    // lineHeight: '120px',
    // color: '#fff',
    // backgroundColor: '#108ee9',
    height: '100%',
  };

const Container = ({ children, title, header = <HeaderDefault />, footer = <FooterDefault /> }) => {
    let titleView;
    if (title !== null) {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Head>
                <title>{titleView}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Blood Glucose Level Prediction" />
                <link rel="icon" href="/bg-prediction-logo.svg" />
            </Head>
                {header}
                <Content style={contentStyle}>
                    {children}
                </Content>
                {footer}
        </Layout>
    );
};

export default Container;
