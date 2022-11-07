import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function LastWeekIncomeBarChart() {
  const { state } = useContext(Context);
  const { userInfo } = state;
  const userID = userInfo.userID;

  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const chart = async () => {
      try {
        var dict = {};
        const { data } = await axios.get(
          `https://apifinanceme.com/api/Summary/${userID}/income-lastweek`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        var deliveryTotal = 0.0;
        var paycheckTotal = 0.0;
        var freelanceTotal = 0.0;
        var otherTotal = 0.0;
        for (var i = 0; i < data.length; i++) {
          if (data[i].category === "delivery") {
            deliveryTotal = deliveryTotal + data[i].amount;
          }
          if (data[i].category === "paycheck") {
            paycheckTotal = paycheckTotal + data[i].amount;
          }
          if (data[i].category === "freelance") {
            freelanceTotal = freelanceTotal + data[i].amount;
          }
          if (data[i].category === "other") {
            otherTotal = otherTotal + data[i].amount;
          }
        }
        dict["Delivery"] = deliveryTotal;
        dict["Paycheck"] = paycheckTotal;
        dict["Freelance"] = freelanceTotal;
        dict["Other"] = otherTotal;

        setChartData({
          labels: Object.keys(dict),
          datasets: [
            {
              label: "Last Week Income Summary $",
              data: Object.values(dict),
              backgroundColor: ["rgba(101, 235, 127, 0.2)"],
              borderColor: ["rgba(52, 146, 90, 1)"],
              borderWidth: 2,
            },
          ],
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        });
      } catch (err) {
        console.log("err", err);
      }
    };
    chart();
  }, [userID, userInfo.token]);

  return <Bar options={chartOptions} data={chartData} />;
}

export default LastWeekIncomeBarChart;
