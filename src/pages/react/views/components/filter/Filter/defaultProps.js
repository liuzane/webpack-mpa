// 第三方模块
import moment from 'moment';

// Select Default Props
const slectProps = {
  getPopupContainer: (triggerNode) => triggerNode?.parentNode?.parentNode,
};

// RangePicker Default Props
const rangePickerProps = {
  ranges: {
    昨天: [
      moment().subtract({
        days: 1,
      }),
      moment().subtract({
        days: 1,
      }),
    ],
    今天: [ moment(), moment() ],
    近一个周: [
      moment().subtract({
        weeks: 1,
      }),
      moment().subtract({
        days: 1,
      }),
    ],
    近一个月: [
      moment().subtract({
        months: 1,
      }),
      moment().subtract({
        days: 1,
      }),
    ],
    // '近三个月': [moment().subtract({ months: 3 }), moment().subtract({ days: 1 })],
  },
};

export default {
  Select: slectProps,
  'DatePicker.RangePicker': rangePickerProps,
};
