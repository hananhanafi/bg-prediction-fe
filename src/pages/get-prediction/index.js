import ContainerAdmin from "@/components/layouts/ContainerAdmin";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import PatientsRecordsRepository from "@/repositories/PatientRecordsRepository";
import { Button, Form, Input, Card, Steps, theme, Spin } from "antd";
import { Line } from "react-chartjs-2";
import { registerables, Chart } from "chart.js";
import moment from "moment";

Chart.register(...registerables);

export default function GetPrediction() {
  const t = useTranslations("GetPrediction");

  const [isLoadPredict, setisLoadPredict] = useState(false);

  const [hyperglycemiaLimitList, setHyperglycemiaLimitList] = useState([]);
  const [hypoglycemiaLimitList, setHypoglycemiaLimitList] = useState([]);

  //   const [dataToPredict, setDataToPredict] = useState([]);
  const [predictionHorizon, setpredictionHorizon] = useState(0);
  const [predictedData, setpredictedData] = useState([]);
  const [predictedlineDataLabel, setPredictedLineDataLabel] = useState([]);
  const [predictedlineDataChart, setPredictedLineDataChart] = useState([]);
  const [lastDate, setlastDate] = useState(new Date());

  const addMinutes = (date, minutes) => {
    date.setMinutes(date.getMinutes() + minutes);

    return date;
  };

  const subMinutes = (date, minutes) => {
    date.setMinutes(date.getMinutes() - minutes);

    return date;
  };
  const predictData = async (dataToPredict, ph) => {
    const nLastdate = subMinutes(new Date(), 30)
    console.log(nLastdate);
    if (dataToPredict[0]) {
      const payloadPredict = {
        data: dataToPredict,
        ph: ph,
      };
      await PatientsRecordsRepository.predict(payloadPredict).then(
        (resPred) => {
          const predict = [...dataToPredict[0], ...(resPred.data?.data ?? 0)];
          const lenData = predict.length;

          setHyperglycemiaLimitList(Array(lenData).fill(180))
          setHypoglycemiaLimitList(Array(lenData).fill(70))
          const remapPredict = predict.map((pred, index) => {
            return {
              key: index + 1,
              bg_level: pred,
              bg_datetime: moment(addMinutes(nLastdate, 5)).format(
                "YYYY-MM-DD HH:mm"
              ),
            };
          });
          const labels = remapPredict.map((pred) => {
            return pred.bg_datetime;
          });
          setPredictedLineDataLabel(labels);
          setPredictedLineDataChart(predict);
          setpredictedData(remapPredict);
        }
      );
      //   next();
      setTimeout(function () {
        // Do something after 5 seconds
        setCurrent(2);
      }, 1000);
    }
  };
  const onFinish = async (values) => {
    setisLoadPredict(true);
    const arrData = new Array(
      [...Array(6)].map((x, i) => {
        return parseFloat(values[`bg_${i + 1}`]);
      })
    );
    const ph = values.prediction_horizon;
    predictData(arrData, ph);
    next();
    setisLoadPredict(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const chartOptions = {
    responsive: true,
    // interaction: {
    //   mode: 'index',
    //   intersect: false,
    // },
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          boxWidth: 7,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    scales: {
      y: {
        // max: 100,
        title: {
          display: true,
          text: t("bloodGlucoseLevel") + " (mg/dL)",
        },
        min: 0,
        ticks: {
          // forces step size to be 50 units
          stepSize: 50
        }
      },
      x: {
        title: {
          display: true,
          text: t("datetime"),
        },
      },
    },
  };
  const limitDatasets = [
    {
      label: t('hyperglycemiaDescription'),
      fill: 'end',
      data: hyperglycemiaLimitList,
      type: "line",
      backgroundColor: "rgba(220, 53, 69, 1)",
      pointHoverBackgroundColor: "white",

      lineTension: 0.1,
      borderColor: "red",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "red",
      pointBackgroundColor: "rgba(220, 53, 69, 1)",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBorderColor: "rgba(255,255,255,1)",
      pointHoverBorderWidth: 0,
      pointRadius: 1,
      pointHitRadius: 10,
    },
    {
      label: t('hypoglycemiaDescription'),
      fill: 'start',
      data: hypoglycemiaLimitList,
      type: "line",
      backgroundColor: "rgba(255, 220, 50, 1)",
      pointHoverBackgroundColor: "white",

      lineTension: 0.1,
      borderColor: "yellow",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "yellow",
      pointBackgroundColor: "rgba(255, 220, 50, 1)",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBorderColor: "rgba(0,0,0,1)",
      pointHoverBorderWidth: 0,
      pointRadius: 1,
      pointHitRadius: 10,
    },
    
  ];
  const down = (ctx, value) => (ctx.p1DataIndex > 5 ? value : undefined);
  const dataLinePredicted = {
    labels: predictedlineDataLabel,
    datasets: [
      {
        label: t("bloodGlucoseLevel") + " (mg/dL)",
        fill: false,
        lineTension: 0.1,
        // backgroundColor: "rgba(220, 53, 69, 1)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(0, 0, 0, .8)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(0, 0, 0, 1)",
        pointBackgroundColor: "rgba(0, 0, 0, 1)",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(0, 0, 0, 1)",
        pointHoverBorderColor: "rgba(255,255,255,1)",
        pointHoverBorderWidth: 0,
        pointRadius: 1,
        pointHitRadius: 10,
        data: predictedlineDataChart,
        type: "line",
        segment: {
          borderColor: (ctx) => down(ctx, "rgb(0,0,255)"),
          pointBorderColor: (ctx) => down(ctx, "rgb(0,0,255)"),
          pointBackgroundColor: (ctx) => down(ctx, "rgb(0,0,255)"),
          pointHoverBackgroundColor: (ctx) => down(ctx, "rgb(0,0,255)"),
        },
      },
      ...limitDatasets,
    ],
  };

  const steps = [
    {
      title: t("inputData"),
      content: (
        <Card className="shadow" title={t("getprediction")}>
          <Form
            name="basic"
            labelCol={{
              md: 8,
              lg: 4,
            }}
            wrapperCol={{
              md: 16,
              lg: 20,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelAlign="left"
          >
            {[...Array(6)].map((x, i) => (
              <Form.Item
                key={i+1}
                label={t("bloodGlucoseLevel") + " - " + (i + 1)}
                name={"bg_" + (i + 1)}
                rules={[
                  {
                    required: true,
                    message:
                      t("pleaseInput") +
                      " " +
                      t("bloodGlucoseLevel") +
                      " - " +
                      (i + 1),
                  },
                ]}
                style={{ textAlign: "left" }}
              >
                <Input type="number" min="0" />
              </Form.Item>
            ))}

            <Form.Item
              label={t("predictionDistance")}
              name={"prediction_horizon"}
              rules={[
                {
                  required: true,
                  message: t("pleaseInput") + " " + t("predictionDistance"),
                },
              ]}
              style={{ textAlign: "left" }}
            >
              <Input type="number" min="0" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                lg: 24,
              }}
              style={{ textAlign: "right" }}
            >
              <Button id="btn-submit" type="primary" htmlType="submit" size="large">
                {t("submit")}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      title: t("predicting"),
      content: (
        <div>
          <Spin /> {t("predicting")}
        </div>
      ),
    },
    {
      title: t("result"),
      content: (
        <Card className="shadow" title={t("bloodGlucoseLevel")}>
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{height:8,width:40,marginRight:8,backgroundColor:'black'}}></div> <span>{t('input')}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{height:8,width:40,marginRight:8,backgroundColor:'rgb(0,0,255)'}}></div> <span>{t('predictionResult')}</span>
            </div>
          </div>
          <Line
            id="prediction-result"
            data={dataLinePredicted}
            // width={400}
            height={100}
            options={{
              ...chartOptions,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
          <div className="text-end">
            <Button id="btn-back" type="primary" onClick={() => setCurrent(0)} size="large">
              {t("back")}
            </Button>
          </div>
        </Card>
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <ContainerAdmin
      title={t("getprediction")}
      breadcrumb={["home", "getprediction"]}
    >
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </ContainerAdmin>
  );
}
