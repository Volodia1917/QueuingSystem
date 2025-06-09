import { API_URL, getToken } from "./useApi";

export const getStatisticNumbersOverview = async () => {
  const data = await fetch(`${API_URL}/Statistic/numbers-overview`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return data.json();
};

export const getStatisticOverallSummary = async () => {
  const data = await fetch(`${API_URL}/Statistic/overall-summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return data.json();
};

export const getStatisticChartData = async (
  period: string,
  startDate?: string,
  endDate?: string
) => {
  const data = await fetch(
    `${API_URL}/Statistic/chart-data?period=${period}${
      startDate ? `&startDate=${startDate}` : ""
    }${endDate ? `&endDate=${endDate}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return data.json();
};
