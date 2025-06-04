import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { Calendar, Col, Row, Select, theme, Typography } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";

dayjs.extend(dayLocaleData);

interface OverviewCalendarProps {
  defaultDate?: Date;
}

const OverviewCalendar: React.FC<OverviewCalendarProps> = ({ defaultDate }) => {
  const { token } = theme.useToken();
  const today = dayjs();

  const [value, setValue] = useState<Dayjs>(
    defaultDate ? dayjs(defaultDate) : today
  );

  const wrapperStyle: React.CSSProperties = {
    width: "100%",
    marginTop: "16px",
    borderRadius: token.borderRadiusLG,
    background: "#fff",
  };

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    setValue(value);
  };

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const dateCellRender = (date: Dayjs) => {
    const isToday = date.format("YYYY-MM-DD") === today.format("YYYY-MM-DD");
    const isSelected = date.format("YYYY-MM-DD") === value.format("YYYY-MM-DD");

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "inline-block",
            width: "24px",
            height: "24px",
            lineHeight: "24px",
            textAlign: "center",
            borderRadius: "8px",
            ...(isToday
              ? {
                  backgroundColor: "#FF7506",
                  color: "white",
                }
              : isSelected
              ? {
                  backgroundColor: "#FFF2E7",
                  color: "#FF7506",
                  border: "1px solid #FF7506",
                }
              : {}),
          }}
        >
          {date.date()}
        </div>
      </div>
    );
  };

  const headerRender: CalendarProps<Dayjs>["headerRender"] = ({
    value,
    onChange,
  }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    let current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      current = current.month(i);
      months.push(localeData.monthsShort(current));
    }

    for (let i = start; i < end; i++) {
      monthOptions.push(
        <Select.Option key={i} value={i} className="month-item">
          {months[i]}
        </Select.Option>
      );
    }

    const year = value.year();
    const month = value.month();
    const yearOptions = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      yearOptions.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>
      );
    }

    // Navigation functions
    const goToPreviousMonth = () => {
      const newDate = value.clone().subtract(1, "month");
      onChange(newDate);
    };

    const goToNextMonth = () => {
      const newDate = value.clone().add(1, "month");
      onChange(newDate);
    };

    return (
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Row gutter={8}>
            <Col>
              <Select
                size="small"
                popupMatchSelectWidth={false}
                className="my-year-select"
                value={year}
                onChange={(newYear) => {
                  const newDate = value.clone().year(newYear);
                  onChange(newDate);
                }}
                style={{ width: 70 }}
              >
                {yearOptions}
              </Select>
            </Col>
            <Col>
              <Select
                size="small"
                popupMatchSelectWidth={false}
                value={month}
                onChange={(newMonth) => {
                  const newDate = value.clone().month(newMonth);
                  onChange(newDate);
                }}
                style={{ width: 70 }}
              >
                {monthOptions}
              </Select>
            </Col>
          </Row>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            onClick={goToPreviousMonth}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#FF7506",
              fontSize: "16px",
            }}
          >
            &lt;
          </button>

          <Typography.Text strong style={{ color: "#FF7506" }}>
            {value.format("DD MMM YYYY")}
          </Typography.Text>

          <button
            onClick={goToNextMonth}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#FF7506",
              fontSize: "16px",
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={wrapperStyle}>
      <Calendar
        value={value}
        fullscreen={false}
        headerRender={headerRender}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        fullCellRender={dateCellRender}
        style={{
          backgroundColor: "#fff",
          borderRadius: token.borderRadiusLG,
        }}
      />
    </div>
  );
};

export default OverviewCalendar;
