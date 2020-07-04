import React, { useState, useEffect } from "react";
import { Line, Bar, defaults } from "react-chartjs-2";

import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  defaults.global.defaultFontColor = 'rgba(255, 255, 255, 0.8)';

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "rgba(126, 180, 231, 1)",
            backgroundColor: "rgba(194, 229, 237, 0.1)",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "rgb(231, 104, 104)",
            backgroundColor: "rgba(255, 64, 64, 0.5)",
            fill: true,
          },
        ],
      }}

      options={{scales:{
        xAxes: [{
          gridLines: {
            color: "rgba(255, 255, 255, 0.15)",
          }
        }],
        yAxes: [{
          gridLines: {
            color: "rgba(255, 255, 255, 0.15)",
          }
        }],
      }}}

    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(126, 180, 231, 0.6)",
              "rgba(126, 206, 126, 0.6)",
              "rgba(231, 104, 104, 0.6)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
        scales: {
          xAxes: [{
          gridLines: {
            color: "rgba(255, 255, 255, 0.15)",
          }
        }],
        yAxes: [{
          gridLines: {
            color: "rgba(255, 255, 255, 0.15)",
          }
        }],
        }
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
