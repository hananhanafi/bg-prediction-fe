import Container from "@/components/layouts/Container";
import { Row, Col, Card, Button, Form, Input, Divider } from "antd";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import {
  getCsrfToken,
  getProviders,
  useSession,
  signIn,
} from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

// const inter = Inter({ subsets: ['latin'] })
// const onFinish = (values) => {
//     console.log('Success:', values);
// };
// const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
// };

const rowStyle = {
  position: "absolute",
  width: "100%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function Login() {
  const t = useTranslations("Login");
  const router = useRouter();
  const { data: session, status: status } = useSession();
  const [providers, setProviders] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    if (session && status !== "loading") {
      router.push("/get-prediction");
    }
    // declare the data fetching function
    const fetchData = async () => {
      if (status !== "loading") {
        if ((await providers) === null) {
          setProviders(await getProviders());
          if ((await csrfToken) === null) {
            setCsrfToken(await getCsrfToken());
          }
        }
      }
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
    // console.log("pr",providers)
  }, [session, status, providers, csrfToken]);

  return (
    <Container title="Login">
      <Row justify="center" align="middle" style={rowStyle}>
        <Col xs={22} sm={16} md={14} lg={12} xl={8}>
          <div className="site-card-border-less-wrapper">
            <Card
              title={t("login")}
              bordered={false}
              className="bg-danger"
              headStyle={{ color: "#fff" }}
              bodyStyle={{ background: "#fff" }}
            >
              <Row justify="center" align="middle" className="text-center">
                <Col span={24}>
                  {providers &&
                    Object.values(providers).map((provider) => {
                      return (
                        <div key={provider.name}>
                          <Button
                            size="large"
                            onClick={() => signIn(provider.id)}
                            className="w-100 mb-2"
                          >
                            {t("continueWith")} {provider.name}
                            <Image
                              src={"/icon-" + provider.id + ".png"}
                              width={20}
                              height={20}
                              className="ms-2"
                              alt={provider.name}
                            ></Image>
                          </Button>
                        </div>
                      );
                    })}
                </Col>
              </Row>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
