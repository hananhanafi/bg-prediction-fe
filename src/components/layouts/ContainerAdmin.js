import React from 'react';
// import { fadeIn } from '~/utilities/animation';
import Head from 'next/head';
import HeaderAdmin from '@/components/shared/headers/HeaderAdmin';
import FooterDefault from '@/components/shared/footers/FooterDefault';
import { Layout, Spin, Breadcrumb, Menu, theme, Card  } from 'antd';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useTranslations } from 'next-intl';

const { Content } = Layout;

const ContainerAdmin = ({ children, title, header = <HeaderAdmin />, footer = <FooterDefault />, breadcrumb = ['home'] }) => {
    const t = useTranslations('Header');
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    let titleView;
    if (title !== null) {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }
    const router = useRouter()
    const { data: session, status: status } = useSession()
    
    useEffect(() => {
        if (!session && status !== 'loading') { 
            // router.push('/api/auth/signin') 
            router.push('/login') 
        }
    }, [session,status])

    if(status === 'loading') return <Spin />;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Head>
                <title>{titleView}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Blood Glucose Level Prediction" />
                <link rel="icon" href="/bg-prediction-logo.svg" />
            </Head>
                {header}
                <Content
                    className="site-layout"
                    style={{
                        padding: '50px 24px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        {breadcrumb && breadcrumb.map((crumb)=>{
                            return <Breadcrumb.Item key={crumb}>{t(crumb)}</Breadcrumb.Item>
                        })}
                    </Breadcrumb>
                    <Card
                    bordered={true}
                    className='shadow'
                    >
                        {children}
                    </Card>
                </Content>
                {footer}
        </Layout>
    );
};

export default ContainerAdmin;
