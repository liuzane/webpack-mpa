// 基础模块
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// 样式
import './Calendar.less';


class Calendar extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      calendar: [],
    };
    this.weekTitles = [ '一', '二', '三', '四', '五', '六', '日' ];
  }

  componentDidMount() {
    this.setCalendar();
  }

  // 判断是不是闰年，如果是返回 1 天，不是返回 0 天
  isLeap = (year) => {
    return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0));
  }

  // 设置日历日期
  setCalendar = (initDate = new Date()) => {
    const currentYear = initDate.getFullYear();
    const currentMonth = initDate.getMonth();
    const currentDay = initDate.getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay() || 7;
    const monthDays = [ 31, 28 + this.isLeap(currentYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    console.log('currentYear', currentYear);
    console.log('currentMonth', currentMonth);
    console.log('currentDay', currentDay);
    console.log('firstDay', firstDay);
    console.log('monthDays', monthDays);
    const calendar = [];
    for (let i = 1; i <= 42; i++) {
      let dateDay = i - firstDay + 1;
      let isCurrentMonth = false;
      const dateItem = {};
      // 判断上个月的日期
      if (dateDay <= 0 && currentMonth !== 0) {
        dateDay = monthDays[currentMonth - 1] + dateDay;
      // 一月份和十二月份的交叉点
      } else if (dateDay <= 0 && currentMonth === 0) {
        dateDay = monthDays[monthDays.length - 1] + dateDay;
      // 判断下个月的日期
      } else if (dateDay > monthDays[currentMonth]) {
        dateDay = dateDay - monthDays[currentMonth];
      // 当月日期
      } else {
        isCurrentMonth = true;
      }
      dateItem.isCurrentMonth = isCurrentMonth;
      dateItem.weekIndex = i % 7 || 7;
      dateItem.isCurrentWeek = isCurrentMonth && (dateDay - currentDay) >= 0 && (dateDay - currentDay) < 7;
      dateItem.isCurrentDay = dateDay === currentDay;
      dateItem.day = dateDay;
      calendar.push(dateItem);
    }
    this.setState({ calendar });
  }

  render() {
    const { weekTitles } = this;
    const { calendar } = this.state;
    return (
      <table 
        cellSpacing="0"
        cellPadding="0"
        className="calendar__container"
      >
        <thead>
          <tr>
            {
              weekTitles.map((weekTitle, weekTitleIndex) => (
                <th key={ weekTitleIndex } className="calendar__title">{ weekTitle }</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            calendar.reduce((total, dateItem, dateIndex) => {
              if (dateIndex % 7 === 0) {
                total.push([ dateItem ]);
              } else {
                total[total.length - 1].push(dateItem);
              }
              return total;
            }, [])
            .map((row, rowIndex) => (
              <tr key={ rowIndex }>
                {
                  row.map((dateItem, dateIndex) => (
                    <td key={ dateIndex } className="calendar__item">
                      <span className={ dateItem.isCurrentWeek ? 'current-week' : dateItem.isCurrentMonth ? '' : 'prev-month' }>{ dateItem.day }</span>
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default Calendar;