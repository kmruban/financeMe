import React, { useState } from "react";
import "./summary.scss";
import AllTimeIncomeBarChart from "../charts/AllTimeIncomeBarChart";
import AllTimeExpenseBarChart from "../charts/AllTimeExpenseBarChart";
import LastYearIncomeBarChart from "../charts/LastYearIncomeBarChart";
import LastYearExpenseBarChart from "../charts/LastYearExpenseBarChart";
import LastMonthIncomeBarChart from "../charts/LastMonthIncomeBarChart";
import LastMonthExpenseBarChart from "../charts/LastMonthExpenseBarChart";
import LastWeekIncomeBarChart from "../charts/LastWeekIncomeBarChart";
import LastWeekExpenseBarChart from "../charts/LastWeekExpenseBarChart";

function Summary() {
  const [lastweek, setlastweek] = useState(false);
  const [lastweekactive, setlastweekactive] = useState(false);
  const [lastmonth, setlastmonth] = useState(true);
  const [lastmonthactive, setlastmonthactive] = useState(true);
  const [lastyear, setlastyear] = useState(false);
  const [lastyearactive, setlastyearactive] = useState(false);
  const [alltime, setalltime] = useState(false);
  const [alltimeactive, setalltimeactive] = useState(false);

  const last7 = () => {
    setlastweek(true);
    setlastmonth(false);
    setlastyear(false);
    setalltime(false);
    setlastmonthactive(false);
    setlastyearactive(false);
    setalltimeactive(false);
    setlastweekactive(true);
  }
  const last30 = () => {
    setlastmonth(true);
    setlastweek(false);
    setlastyear(false);
    setalltime(false);
    setlastmonthactive(true);
    setlastyearactive(false);
    setalltimeactive(false);
    setlastweekactive(false);
  }
  const last365 = () => {
    setlastyear(true);
    setlastweek(false);
    setlastmonth(false);
    setalltime(false);
    setlastmonthactive(false);
    setlastyearactive(true);
    setalltimeactive(false);
    setlastweekactive(false);
  }
  const forever = () => {
    setalltime(true);
    setlastweek(false);
    setlastmonth(false);
    setlastyear(false);
    setlastmonthactive(false);
    setlastyearactive(false);
    setalltimeactive(true);
    setlastweekactive(false);
  }

  return (
    <div className="summary">
      <div className="title">Summary</div>
      <div className="summary_filter">
        <button onClick={last7} className={ lastweekactive ? "active" : ""}>Last 7</button>
        <button onClick={last30} className={ lastmonthactive ? "active" : ""}>Last 30</button>
        <button onClick={last365} className={ lastyearactive ? "active" : ""}>Last Year</button>
        <button onClick={forever} className={ alltimeactive ? "active" : ""}>All Time</button>
      </div>
      <div className="charts">
        {lastweek && (
          <>
            <LastWeekIncomeBarChart />
            <LastWeekExpenseBarChart />
          </>
        )}
        {lastmonth && (
          <>
            <LastMonthIncomeBarChart />
            <LastMonthExpenseBarChart />
          </>
        )}
        {lastyear && (
          <>
            <LastYearIncomeBarChart />
            <LastYearExpenseBarChart />
          </>
        )}
        {alltime && (
          <>
            <AllTimeIncomeBarChart />
            <AllTimeExpenseBarChart />
          </>
        )}
      </div>
    </div>
  );
}

export default Summary;
