import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import '../assets/CalendarStyles.css';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    {format(currentMonth, 'yyyy')}년
                    &nbsp;
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                </span>
            </div>
            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thrs', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick, attendanceData }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    const isDateInAttendance = (date) => {
        return attendanceData.find((item) => isSameDay(new Date(item.attendanceDate), date));  // 날짜 비교 수정
    };

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            const attendance = isDateInAttendance(day);
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : attendance
                            ? 'present'
                            : 'valid'
                    }`}
                    key={day}
                    onClick={() => onDateClick(parse(cloneDay))}
                >
                    <span
                        className={format(currentMonth, 'M') !== format(day, 'M') ? 'text not-valid' : ''}
                    >
                        {formattedDate}
                    </span>
                    {attendance && (
                        <div className="attendanceMarker">
                            🍊  {/* 출석한 날짜 표시 */}
                        </div>
                    )}
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(<div className="row" key={day}>{days}</div>);
        days = [];
    }
    return <div className="body">{rows}</div>;
};

export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState([]);  // 상태 정의
    const userId = 'e4cad81c-af75-4c93-b8ca-6f6ee75a88e5';  // 예시 userId (실제 값으로 변경 가능)

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };

    // 출석 데이터를 가져오는 함수
    const fetchAttendanceData = async () => {
        try {
            const response = await fetch(`/api/attendance/${userId}`);
            if (!response.ok) {
                throw new Error('출석 데이터를 가져오는 데 실패했습니다');
            }
            const data = await response.json();
            // console.log("Fetched Attendance Data:", data); // 디버깅용 로그
            setAttendanceData(data);
        } catch (error) {
            console.error('출석 데이터를 가져오는 데 실패했습니다:', error);
        }
    };
    
    // 컴포넌트가 마운트될 때 출석 데이터 가져오기
    useEffect(() => {
        fetchAttendanceData();
    }, []);  // 빈 배열을 넣어 한 번만 실행되도록 설정

    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
                attendanceData={attendanceData} // 출석 데이터 전달
            />
        </div>
    );
};

export default Calendar;
