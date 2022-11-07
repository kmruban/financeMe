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

function LastMonthExpenseBarChart() {
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
          `https://apifinanceme.com/api/Summary/${userID}/expense-lastmonth`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        var rentTotal = 0.0;
        var gasTotal = 0.0;
        var groceriesTotal = 0.0;
        var otherTotal = 0.0;
        for (var i = 0; i < data.length; i++) {
          if (data[i].category === "rent") {
            rentTotal = rentTotal + data[i].amount;
          }
          if (data[i].category === "gas") {
            gasTotal = gasTotal + data[i].amount;
          }
          if (data[i].category === "groceries") {
            groceriesTotal = groceriesTotal + data[i].amount;
          }
          if (data[i].category === "other") {
            otherTotal = otherTotal + data[i].amount;
          }
        }
        dict["Rent"] = rentTotal;
        dict["Gas"] = gasTotal;
        dict["Groceries"] = groceriesTotal;
        dict["Other"] = otherTotal;

        setChartData({
          labels: Object.keys(dict),
          datasets: [
            {
              label: "Last Month Expense Summary $",
              data: Object.values(dict),
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
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

export default LastMonthExpenseBarChart;
