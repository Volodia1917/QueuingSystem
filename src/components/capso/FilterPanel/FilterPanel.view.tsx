import React, { useState, useRef, useEffect } from 'react';
import { CalendarDays, Search } from 'lucide-react';
import styles from './FilterPanel.module.css';
import format from 'date-fns/format';
import 'react-date-range/dist/styles.css'; // styles mặc định
import 'react-date-range/dist/theme/default.css'; // theme mặc định
import { DateRange, Range } from 'react-date-range';
import type { AdminFilterRequest } from '../../../libraries/assignmentApi';

interface FilterPanelProps {
  onFilterChange?: (filters: AdminFilterRequest) => void;
  services?: Array<{ serviceCode: string; serviceName: string }>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, services = [] }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [filters, setFilters] = useState<AdminFilterRequest>({});
  const [keywordInput, setKeywordInput] = useState<string>('');

  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Debounce keyword input
  useEffect(() => {
    const timer = setTimeout(() => {
      const value = keywordInput.trim() || undefined;
      updateFilters({ keyword: value });
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [keywordInput]);
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

  // Update filters and notify parent
  const updateFilters = (newFilters: Partial<AdminFilterRequest>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'all' ? undefined : e.target.value;
    updateFilters({ serviceCode: value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let status: number | undefined;
    switch (value) {
      case 'waiting':
        status = 1;
        break;
      case 'used':
        status = 2;
        break;
      case 'skipped':
        status = 3;
        break;
      default:
        status = undefined;
    }
    updateFilters({ status });
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'all' ? undefined : e.target.value;
    updateFilters({ source: value });
  };

  const handleDateRangeChange = (item: any) => {
    const newRange = [item.selection];
    setRange(newRange);

    const startDate = item.selection.startDate ? item.selection.startDate.toISOString() : undefined;
    const endDate = item.selection.endDate ? item.selection.endDate.toISOString() : undefined;

    updateFilters({
      startDate,
      endDate
    });
  };
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
  };


  return (
    <div className={styles.filterPanel}>      {/* Tên dịch vụ */}
      <div className={styles.filterItem}>
        <label>Tên dịch vụ</label>
        <div className={styles.customSelect}>
          <select onChange={handleServiceChange} value={filters.serviceCode || 'all'}>
            <option value="all">Tất cả</option>
            {services.map((service) => (
              <option key={service.serviceCode} value={service.serviceCode}>
                {service.serviceName}
              </option>
            ))}
          </select>
          <i className="bx bx-caret-down"></i>
        </div>
      </div>

      {/* Tình trạng */}
      <div className={styles.filterItem}>
        <label>Tình trạng</label>
        <div className={styles.customSelect}>
          <select onChange={handleStatusChange} value={
            filters.status === 1 ? 'waiting' :
              filters.status === 2 ? 'used' :
                filters.status === 3 ? 'skipped' : 'all'
          }>
            <option value="all">Tất cả</option>
            <option value="waiting">Đang chờ</option>
            <option value="used">Đã sử dụng</option>
            <option value="skipped">Bỏ qua</option>
          </select>
          <i className="bx bx-caret-down"></i>
        </div>
      </div>

      {/* Nguồn cấp */}
      <div className={styles.filterItem}>
        <label>Nguồn cấp</label>
        <div className={styles.customSelect}>
          <select onChange={handleSourceChange} value={filters.source || 'all'}>
            <option value="all">Tất cả</option>
            <option value="Kiosk">Kiosk</option>
            <option value="System">Hệ thống</option>
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
        </div>        {showCalendar && (
          <div className={styles.calendarDropdown} ref={calendarRef}>
            <DateRange
              editableDateInputs={true}
              onChange={handleDateRangeChange}
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
        <div className={styles.searchBox}>          <input
          type="text"
          placeholder="Nhập từ khóa"
          onChange={handleKeywordChange}
          value={keywordInput}
        />
          <Search size={18} color="#FF7506" className={styles.rightIcon} />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
