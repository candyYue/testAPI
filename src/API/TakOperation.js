
export const commonParams = {
  taskId: {
    key: 'task_id',
    value: 1,
    desr: '任务批次',
    type: 'String'
  },
  taskIds: {
    key: 'task_ids',
    value: [{
      'task_id': 1233
    }],
    required: true,
    desr: '任务批次',
    type: 'Array',
    mock: {
      'task_id': '@string'
    },
    children: [{
      key: 'task_id',
      value: 233,
      required: true,
      desr: '任务ID'
    }
    ]
  }
}

const TakOperation = {
  key: 'TakOperation',
  name: '任务操作接口定义',
  children: [{
    key: 'saveOutcallTask',
    name: '创建任务接口',
    url: '/api/task/createTask',
    method: 'POST',
    params: [
      { ...commonParams.taskId,
        required: true
      },
      {
        key: 'uuid',
        value: '121212',
        required: false,
        desr: '开发者平台唯一标记，用于回调'
      },
      {
        key: 'task_name',
        value: '我的外呼任务',
        required: true,
        desr: '任务名称',
        mock: '@ctitle'
      },
      {
        key: 'account_num',
        value: 5,
        required: true,
        desr: '机器人人数',
        type: 'Number',
        mock: '@integer( 0, 5 )'
      },
      {
        key: 'script_id',
        value: 1,
        required: true,
        desr: '话术ID',
        type: 'Number'
      },
      {
        key: 'schedule_time',
        value: '',
        required: false,
        desr: '定时任务的时间戳',
        type: 'DatePicker',
        pickerType: 'datetime',
        valueFormat: 'timestamp'
      },
      {
        key: 'call_data',
        value: '',
        required: true,
        desr: '任务呼叫文件',
        type: 'file',
        filename: ''
      },
      {
        key: 'call_number',
        value: ['025-66699741'],
        required: false,
        desr: '任务主叫号码',
        type: 'Array'
      },
      {
        key: 'invalid_start_time',
        value: '12:00',
        required: false,
        desr: '不外呼开始时间',
        type: 'TimePicker'
      },
      {
        key: 'invalid_end_time',
        value: '13:00',
        required: false,
        desr: '不外呼结束时间',
        type: 'TimePicker'
      },
      {
        key: 'auto_recall_status',
        value: 0,
        required: false,
        desr: '自动重呼状态',
        type: 'Number',
        mock: '@integer( 0, 1 )'
      },
      {
        key: 'auto_recall_scenes',
        value: [1],
        required: false,
        desr: '自动重呼场景JSON',
        type: 'CheckBoxArray',
        options: [
          {
            label: '接听后挂断',
            value: 1
          },
          {
            label: '通话成功',
            value: 2
          },
          {
            label: '未接听',
            value: 3
          },
          {
            label: '外呼失败',
            value: 4
          },
          {
            label: '拒接',
            value: 5
          },
          {
            label: '空号',
            value: 6
          },
          {
            label: '关机',
            value: 7
          },
          {
            label: '停机',
            value: 8
          },
          {
            label: '不在服务区',
            value: 9
          },
          {
            label: '占线',
            value: 10
          },
          {
            label: '总机欠费',
            value: 11
          }
        ]
      },
      {
        key: 'auto_recall_interval',
        value: 1,
        required: false,
        desr: '自动重呼间隔时间',
        type: 'Number',
        mock: '@integer( 1, 60 )'
      },
      {
        key: 'auto_recall_max_times',
        value: 1,
        required: false,
        desr: '自动重呼次数上限',
        type: 'Number',
        mock: '@integer( 1, 10 )'
      },
      {
        key: 'priority',
        value: 1,
        required: true,
        desr: '任务优先级',
        type: 'SelectOptions',
        options: [1, 2, 3, 4, 5]
      },
      {
        key: 'valid_start_time',
        value: '12:00',
        required: false,
        desr: '外呼开始时间',
        type: 'TimePicker'
      },
      {
        key: 'valid_end_time',
        value: '13:00',
        required: false,
        desr: '外呼结束时间',
        type: 'TimePicker'
      },
      {
        key: 'valid_start_date',
        value: '2019-10-09',
        required: false,
        desr: '外呼有效期开始日期',
        type: 'DatePicker',
        pickerType: 'date',
        valueFormat: 'yyyy-MM-dd'
      },
      {
        key: 'valid_end_date',
        value: '2019-10-10',
        required: false,
        desr: '外呼有效期结束日期',
        type: 'DatePicker',
        pickerType: 'date',
        valueFormat: 'yyyy-MM-dd'
      }
    ],
    auth: true
  },
  {
    key: 'importClues',
    name: '导入客户接口',
    url: '/api/task/importClues',
    method: 'POST',
    params: [{ ...commonParams.taskId,
      required: true
    },
    {
      key: 'var_keys',
      value: ['姓名'],
      required: false,
      desr: '所映射字段变量键值',
      type: 'Array'
    },
    {
      key: 'clues',
      value: [{
        'clue': '13655172898',
        'var_values': ['张飞']
      }],
      required: true,
      desr: '导入多个线索号码',
      type: 'Array',
      mock: {
        'clue': /^1(0|3|4|5|7|8)[0-9]\d{8}$/,
        'var_values': ['@cname']
      },
      children: [{
        key: 'clue',
        value: '13655172898',
        required: true,
        desr: '线索号码'
      },
      {
        key: 'var_values',
        value: ['张飞'],
        required: false,
        desr: '线索参数',
        type: 'Array'
      }
      ]
    }
    ],
    auth: true
  },
  {
    key: 'importCluesAllowRepeat',
    name: '导入重复客户接口',
    url: '/api/task/importCluesAllowRepeat',
    method: 'POST',
    params: [{
      ...commonParams.taskId,
      required: true
    },
    {
      key: 'var_keys',
      value: ['姓名'],
      required: false,
      desr: '所映射字段变量键值',
      type: 'Array'
    },
    {
      key: 'clues',
      value: [{
        'clue': '13655172898',
        'var_values': ['张飞']
      }],
      required: true,
      desr: '导入多个线索号码',
      type: 'Array',
      mock: {
        'clue': /^1(0|3|4|5|7|8)[0-9]\d{8}$/,
        'var_values': ['@cname']
      },
      children: [{
        key: 'clue',
        value: '13655172898',
        required: true,
        desr: '线索号码'
      },
      {
        key: 'var_values',
        value: ['张飞'],
        required: false,
        desr: '线索参数',
        type: 'Array'
      }
      ]
    }
    ],
    auth: true
  },
  {
    key: 'deleteClues',
    url: '/api/task/deleteClues',
    method: 'POST',
    name: '删除号码接口',
    params: [{ ...commonParams.taskId,
      required: true
    },
    {
      key: 'clues',
      value: ['13655172898'],
      required: true,
      desr: '线索号码',
      type: 'Array'
    }
    ],
    auth: true
  },
  {
    key: 'mdfyTask',
    method: 'POST',
    url: '/api/task/mdfyTask',
    name: '管理外呼任务接口',
    params: [{
      key: 'task_ids',
      value: [{
        'task_id': 1233,
        'flag': 1
      }],
      required: true,
      desr: '任务批次',
      type: 'Array',
      mock: {
        'task_id': '@string',
        'flag': '@integer(1, 3)'
      },
      children: [{
        key: 'task_id',
        value: 233,
        required: true,
        desr: '任务ID'
      }, {
        key: 'flag',
        value: 1,
        required: true,
        desr: '操作标志'
      }
      ]
    }, {
      key: 'flag',
      value: 1,
      required: true,
      desr: '操作flag',
      type: 'Number'
    }],
    auth: true
  },
  {
    key: 'startOutcallTask',
    method: 'POST',
    url: '/api/task/startOutcallTask',
    name: '启动任务接口',
    params: [{ ...commonParams.taskId,
      required: true
    }],
    auth: true
  },
  {
    key: 'pauseOutcallTask',
    method: 'POST',
    url: '/api/task/pauseOutcallTask',
    name: '暂停任务接口',
    params: [{ ...commonParams.taskId,
      required: true
    }],
    auth: true
  },
  {
    key: 'deleteOutcallTask',
    method: 'POST',
    url: '/api/task/deleteOutcallTask',
    name: '删除任务接口',
    params: [{ ...commonParams.taskId,
      required: true
    }],
    auth: true
  },
  {
    key: 'deleteOutcallTasks',
    method: 'POST',
    url: '/api/task/deleteOutcallTasks',
    name: '批量删除任务',
    params: [
      {
        key: 'task_ids',
        value: [''],
        required: true,
        type: 'Array',
        desr: '任务id集合'
      }],
    auth: true
  },
  {
    key: 'recallClues',
    method: 'POST',
    url: '/api/task/recallClues',
    name: '批量重呼接口',
    params: [{ ...commonParams.taskId,
      required: true
    },
    {
      key: 'clues',
      value: ['13655172898'],
      desr: '线索号码',
      required: true,
      type: 'Array'
    }
    ],
    auth: true
  }
  ]
}
export default TakOperation
