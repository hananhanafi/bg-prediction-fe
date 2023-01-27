import React from 'react';
import Head from 'next/head';
import HeaderDefault from '../shared/headers/HeaderDefault';
import FooterDefault from '../shared/footers/FooterDefault';
import { Layout } from 'antd';

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
                <Layout style={{height: '100%'}}>
                    {children}
                </Layout>
                {footer}
        </Layout>
    );
};

export default Container;
