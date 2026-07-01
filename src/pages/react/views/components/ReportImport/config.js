export const layout = [
  { i: 'header', x: 0, y: 0, w: 8, h: 8, static: true },
  { i: 'table', x: 10, y: 0, w: 16, h: 8, static: true },
];

export const enums = {
  date: {
    key: 'date',
    name: '日期',
    dataIndex: 'dateStr',
  },

  city: {
    key: 'city',
    name: '城市',
    dataIndex: 'cityName',
  },

  channel: {
    key: 'channel',
    name: '渠道',
    dataIndex: 'channelName',
  },

  cost: {
    key: 'cost',
    name: '成本',
    dataIndex: 'cost',
  },

  income: {
    key: 'income',
    name: '收入',
    dataIndex: 'income',
  },
};

export const excelColumnName = {
  [enums.date.name]: enums.date.dataIndex,
  [enums.city.name]: enums.city.dataIndex,
  [enums.channel.name]: enums.channel.dataIndex,
  [enums.cost.name]: enums.cost.dataIndex,
  [enums.income.name]: enums.income.dataIndex,
};

export const modules = [
  {
    label: enums.city.name,
    value: enums.city.key,
  },
  {
    label: enums.channel.name,
    value: enums.channel.key,
  },
  // {
  //   label: enums.date.name,
  //   value: enums.date.key,
  // },
];

export const columns = (mode) => {
  const base_columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 50,
    },
    {
      title: enums.date.name,
      dataIndex: enums.date.dataIndex,
      editable: true,
      rules: [
        {
          required: true,
          message: '请输入日期',
        },
        {
          validator: (rule, value, callback) => {
            if (!/^\d{4}-[01]\d-[0-3]\d/.test(value)) {
              callback('请改为YYYY-MM-DD格式');
            } else {
              callback();
            }
          }
        },
      ]
    },
    {
      title: enums.cost.name,
      dataIndex: enums.cost.dataIndex,
      editable: true,
    },
    {
      title: enums.income.name,
      dataIndex: enums.income.dataIndex,
      editable: true,
    },
  ];

  if (mode === enums.city.key) {
    base_columns.splice(1, 0, {
      title: enums.city.name,
      dataIndex: enums.city.dataIndex,
      editable: true,
      rules: [
        {
          required: true,
          message: '请选择城市',
        },
      ]
    });
  }

  if (mode === enums.channel.key) {
    base_columns.splice(1, 0, {
      title: enums.channel.name,
      dataIndex: enums.channel.dataIndex,
      editable: true,
    });
  }

  return base_columns;
};
