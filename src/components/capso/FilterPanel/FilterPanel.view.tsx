import React, { useState, useRef, useEffect } from 'react';
import { CalendarDays, Search } from 'lucide-react';
import styles from './FilterPanel.module.css';
import format from 'date-fns/format';
import 'react-date-range/dist/styles.css'; // styles mặc định
import 'react-date-range/dist/theme/default.css'; // theme mặc định
import { DateRange, Range } from 'react-date-range';

const FilterPanel = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  // const today = new Date().toISOString().split('T')[0];

  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);


  return (
    <div className={styles.filterPanel}>
      {/* Tên dịch vụ */}
      <div className={styles.filterItem}>
        <label>Tên dịch vụ</label>
        <div className={styles.customSelect}>
          <select>
            <option>Tất cả</option>
            <option>Khám sản - Phụ khoa</option>
            <option>Khám tai mũi họng</option>
            <option>Khám răng hàm mặt</option>
          </select>
          <i className="bx bx-caret-down"></i>
        </div>
      </div>

      {/* Tình trạng */}
      <div className={styles.filterItem}>
        <label>Tình trạng</label>
        <div className={styles.customSelect}>
          <select>
            <option>Tất cả</option>
            <option>Đang chờ</option>
            <option>Đã sử dụng</option>
            <option>Bỏ qua</option>
          </select>
          <i className="bx bx-caret-down"></i>
        </div>
      </div>

      {/* Nguồn cấp */}
      <div className={styles.filterItem}>
        <label>Nguồn cấp</label>
        <div className={styles.customSelect}>
          <select>
            <option>Tất cả</option>
            <option>Kiosk</option>
            <option>Hệ thống</option>
          </select>
          <i className="bx bx-caret-down"></i>
        </div>
      </div>

      {/* Chọn thời gian */}
      <div className={styles.filterItem}>
        <label>Chọn thời gian</label>
        <div className={styles.dateRangeWrapper}>
          <div
            className={styles.datePickerContainer}
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarDays size={18} color="#FF7506" />
            <span>
              {range[0].startDate ? format(range[0].startDate, 'dd/MM/yyyy') : ''}
            </span>
          </div>
          <span className={styles.dateSeparator}> &gt; </span>
          <div
            className={styles.datePickerContainer}
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarDays size={18} color="#FF7506" />
            <span>
              {range[0].endDate ? format(range[0].endDate, 'dd/MM/yyyy') : ''}
            </span>
          </div>
        </div>

        {showCalendar && (
          <div className={styles.calendarDropdown} ref={calendarRef}>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setRange([item.selection]);                
              }}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={1}
              direction="horizontal"
              rangeColors={['#FF7506']}
            />
          </div>
        )}
      </div>

      {/* Từ khóa */}
      <div className={styles.filterItem}>
        <label>Từ khoá</label>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Nhập từ khóa" />
          <Search size={18} color="#FF7506" className={styles.rightIcon} />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
