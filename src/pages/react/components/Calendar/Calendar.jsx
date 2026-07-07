// 基础模块
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
      currentDate: new Date(),
    };
    this.weekTitles = [ '日', '一', '二', '三', '四', '五', '六' ];
  }

  componentDidMount() {
    this.setCalendar();
  }

  // 判断是不是闰年，如果是返回 1 天，不是返回 0 天
  isLeap = (year) => {
    return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0));
  }

  // 获取农历日期（简易算法）
  getLunarDate = (solarDate) => {
    const year = solarDate.getFullYear();
    const month = solarDate.getMonth() + 1;
    const day = solarDate.getDate();
    return this.lunarCalendar(year, month, day);
  }

  // 简易农历计算（基于2000-2100年）
  // 在 Calendar 类中替换原有的 lunarCalendar 方法
  lunarCalendar = (year, month, day) => {
    // 农历数据（2000~2100年）
    const lunarInfo = [
      0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
      0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
      0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
      0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
      0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
      0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
      0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
      0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
      0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
      0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
      0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
      0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
      0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
      0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
      0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
      0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
      0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
      0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d260,
      0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
      0x0d520
    ];

    const Gan = [ '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸' ];
    const Zhi = [ '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥' ];
    const Animals = [ '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪' ];
    const lunarDay = [ '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
      '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九',
      '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十' ];
    const lunarMonth = [ '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊' ];

    // 基准日：2000年2月5日 = 农历庚辰年正月初一
    const baseDate = new Date(2000, 1, 5);
    const targetDate = new Date(year, month - 1, day);
    let offset = Math.floor((targetDate - baseDate) / (24 * 60 * 60 * 1000));
    if (offset < 0) {
      // 若日期早于2000-02-05，返回一个默认值（实际不会出现，因为本组件只显示当前附近日期）
      return {
        year: 2000,
        month: 1,
        day: 1,
        lunarDay: '初一',
        lunarMonth: '正',
        ganZhiYear: '庚辰',
        animal: '龙',
        isLeap: false
      };
    }

    let lunarYear = 2000;
    while (true) {
      const info = lunarInfo[lunarYear - 2000];
      if (!info) break; // 超出数组范围

      const leapMonth = info & 0xf; // 低4位：闰月月份（0=无闰月）
      const leapDays = (info & 0x10000) ? 30 : 29; // 第16位：闰月大小

      // 计算该农历年总天数（含闰月）
      let yearDays = 0;
      for (let m = 1; m <= 12; m++) {
        // 第15位对应1月，第14位对应2月 ... 第4位对应12月
        const monthDays = (info & (0x8000 >> (m - 1))) ? 30 : 29;
        yearDays += monthDays;
      }
      if (leapMonth > 0) yearDays += leapDays;

      if (offset >= yearDays) {
        offset -= yearDays;
        lunarYear++;
      } else {
        // 在该年内查找月份
        // 构建该年所有月份的列表（含闰月）
        const monthList = [];
        for (let m = 1; m <= 12; m++) {
          const mDays = (info & (0x8000 >> (m - 1))) ? 30 : 29;
          monthList.push({ month: m, days: mDays, isLeap: false });
          // 若当前月后紧接闰月，插入闰月
          if (leapMonth > 0 && m === leapMonth) {
            monthList.push({ month: m, days: leapDays, isLeap: true });
          }
        }
        console.log(monthList);
        // 逐月减去天数，找到目标月
        for (const item of monthList) {
          if (offset >= item.days) {
            offset -= item.days;
          } else {
            const lunarMonthIndex = item.month;
            const lunarDayValue = offset + 1;
            const isLeapMonth = item.isLeap;
            const monthName = (isLeapMonth ? '闰' : '') + lunarMonth[lunarMonthIndex - 1];
            const dayName = lunarDay[lunarDayValue - 1];
            const ganZhiYear = Gan[(lunarYear - 4) % 10] + Zhi[(lunarYear - 4) % 12];
            const animal = Animals[(lunarYear - 4) % 12];
            return {
              year: lunarYear,
              month: lunarMonthIndex,
              day: lunarDayValue,
              lunarDay: dayName,
              lunarMonth: monthName,
              ganZhiYear: ganZhiYear,
              animal: animal,
              isLeap: isLeapMonth
            };
          }
        }
        // 理论上不会走到这里
        break;
      }
    }

    // 兜底返回
    return {
      year: lunarYear,
      month: 1,
      day: 1,
      lunarDay: '初一',
      lunarMonth: '正',
      ganZhiYear: '庚辰',
      animal: '龙',
      isLeap: false
    };
  };

  // 设置日历日期
  setCalendar = (initDate = new Date()) => {
    const currentYear = initDate.getFullYear();
    const currentMonth = initDate.getMonth();
    const currentDay = initDate.getDate();
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const monthDays = [ 31, 28 + this.isLeap(currentYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    const calendar = [];

    for (let i = 0; i < 42; i++) {
      let dateDay = i - firstDay + 1;
      let isCurrentMonth = false;
      let actualDate = null;
      const dateItem = {};

      // 判断上个月的日期
      if (dateDay <= 0 && currentMonth !== 0) {
        dateDay = monthDays[currentMonth - 1] + dateDay;
        actualDate = new Date(currentYear, currentMonth - 1, dateDay);
      } else if (dateDay <= 0 && currentMonth === 0) {
        // 一月份和十二月份的交叉点
        dateDay = monthDays[monthDays.length - 1] + dateDay;
        actualDate = new Date(currentYear - 1, 11, dateDay);
      } else if (dateDay > monthDays[currentMonth]) {
        // 判断下个月的日期
        dateDay = dateDay - monthDays[currentMonth];
        actualDate = new Date(currentYear, currentMonth + 1, dateDay);
      } else {
        // 当月日期
        isCurrentMonth = true;
        actualDate = new Date(currentYear, currentMonth, dateDay);
      }

      const lunarDate = this.getLunarDate(actualDate);

      dateItem.isCurrentMonth = isCurrentMonth;
      dateItem.weekIndex = i % 7;
      dateItem.isWeekend = dateItem.weekIndex === 0 || dateItem.weekIndex === 6;
      dateItem.isCurrentWeek = isCurrentMonth && (dateDay - currentDay) >= 0 && (dateDay - currentDay) < 7;
      dateItem.isToday = actualDate.getFullYear() === todayYear &&
        actualDate.getMonth() === todayMonth &&
        actualDate.getDate() === todayDay;
      dateItem.day = dateDay;
      dateItem.lunarDay = lunarDate.lunarDay;
      dateItem.lunarMonth = lunarDate.lunarMonth;

      calendar.push(dateItem);
    }
    this.setState({ calendar });
  }

  render() {
    const { weekTitles } = this;
    const { calendar } = this.state;
    return (
      <div className={classNames('calendar', this.props.className)} style={this.props.style}>
        <table
          cellSpacing="0"
          cellPadding="0"
          className="calendar__container"
        >
          <thead>
            <tr>
              {
                weekTitles.map((weekTitle, weekTitleIndex) => (
                  <th
                    key={weekTitleIndex}
                    className={classNames('calendar__title', {
                      'calendar__title--weekend': weekTitleIndex === 0 || weekTitleIndex === 6
                    })}
                  >
                    {weekTitle}
                  </th>
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
                  <tr key={rowIndex}>
                    {
                      row.map((dateItem, dateIndex) => (
                        <td
                          key={dateIndex}
                          className={classNames('calendar__item', {
                            'calendar__item--weekend': dateItem.isWeekend,
                            'calendar__item--other-month': !dateItem.isCurrentMonth,
                            'calendar__item--today': dateItem.isToday
                          })}
                        >
                          <div className="calendar__day">
                            <span className="calendar__day-solar">{dateItem.day}</span>
                            <span className="calendar__day-lunar">{dateItem.lunarDay}</span>
                          </div>
                        </td>
                      ))
                    }
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;