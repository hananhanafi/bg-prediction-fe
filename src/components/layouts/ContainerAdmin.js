import React from 'react';
// import { fadeIn } from '~/utilities/animation';
import Head from 'next/head';
import HeaderAdmin from '@/components/shared/headers/HeaderAdmin';
import FooterDefault from '@/components/shared/footers/FooterDefault';
import { Layout, Space, theme } from 'antd';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"

const { Content } = Layout;
const contentStyle = {
    height: '100%',
  };

const ContainerAdmin = ({ children, title, header = <HeaderAdmin />, footer = <FooterDefault /> }) => {
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

export default ContainerAdmin;
