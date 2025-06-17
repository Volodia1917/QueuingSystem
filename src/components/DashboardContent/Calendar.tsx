import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { Calendar, Card, Typography } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(dayLocaleData);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  weekStart: 1,
  weekdaysShort: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
});

const OverviewCalendar: React.FC = () => {
  const today = dayjs();
  const [value, setValue] = useState<Dayjs>(today);

  const onPanelChange = (value: Dayjs) => {
    setValue(value);
  };

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const dateCellRender = (date: Dayjs) => {
    const isToday = date.format("YYYY-MM-DD") === today.format("YYYY-MM-DD");
    const isSelected = date.format("YYYY-MM-DD") === value.format("YYYY-MM-DD");
    const isCurrentMonth = date.month() === value.month();
    let bg = "transparent";
    let color = "#333";
    let border = undefined;
    if (!isCurrentMonth) {
      color = "#E4E4E4";
    } else if (isSelected) {
      bg = "#FF7506";
      color = "#fff";
    } else if (isToday) {
      border = "1.5px solid #FF7506";
      color = "#FF7506";
    }
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
            width: "32px",
            height: "32px",
            lineHeight: "32px",
            textAlign: "center",
            borderRadius: "8px",
            fontWeight: isSelected ? 700 : 400,
            fontSize: "16px",
            color,
            backgroundColor: bg,
            border,
            cursor: isCurrentMonth ? "pointer" : "default",
            transition: "all 0.2s",
          }}
          className={
            isCurrentMonth && !isSelected ? "calendar-day-hoverable" : undefined
          }
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
          padding: "10px 0 20px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        }}
      >
        <button
          onClick={goToPreviousMonth}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#FF7506",
            fontSize: "20px",
            fontWeight: 700,
            padding: "0 16px",
          }}
          aria-label="Previous month"
        >
          &lt;
        </button>
        <Typography.Text strong style={{ color: "#FF7506", fontSize: 20 }}>
          {value.format("DD MMM YYYY")}
        </Typography.Text>
        <button
          onClick={goToNextMonth}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#FF7506",
            fontSize: "20px",
            fontWeight: 700,
            padding: "0 16px",
          }}
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <Card
      size="small"
      style={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
    >
      <Calendar
        value={value}
        fullscreen={false}
        headerRender={headerRender}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        fullCellRender={dateCellRender}
        style={{ border: "none" }}
        className="custom-calendar"
      />
      <style>{`
        .custom-calendar .ant-picker-calendar-header {
          display: none;
        }
        .custom-calendar .ant-picker-calendar-date-content {
          display: none;
        }
        .custom-calendar .ant-picker-calendar-date {
          padding: 0 !important;
        }
        .custom-calendar .ant-picker-calendar-week-panel th {
          color: #FF7506;
          font-weight: 700;
          font-size: 16px;
        }
        .calendar-day-hoverable:hover {
          background: #FFF2E7 !important;
          color: #FF7506 !important;
        }
      `}</style>
    </Card>
  );
};

export default OverviewCalendar;
