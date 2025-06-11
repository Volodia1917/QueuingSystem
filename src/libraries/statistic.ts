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
  month?: string,
) => {
  const data = await fetch(
    `${API_URL}/Statistic/chart-data?period=${period}${
      month ? `&month=${month}` : ""
    }`,
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
