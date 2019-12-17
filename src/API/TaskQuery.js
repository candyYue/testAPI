import { commonParams } from './TakOperation'

const TaskQuery = {
  key: 'TaskQuery',
  name: '任务查询口定义',
  children: [{
    key: 'getTaskList',
    url: '/api/task/qryTaskLst',
    method: 'POST',
    name: '任务列表接口',
    params: [{
      key: 'pageNum',
      value: 1,
      required: false,
      desr: '分页查询，第几页',
      type: 'Number'
    },
    {
      key: 'showNum',
      value: 20,
      required: false,
      desr: '分页查询，一页多少条数据',
      type: 'Number'
    }
    ],
    auth: true
  },
  {
    key: 'getTaskDetail',
    url: '/api/task/qryTaskDtl',
    method: 'POST',
    name: '任务详情接口',
    params: [{
      ...commonParams.taskIds
    }],
    auth: true
  },
  {
    key: 'getCallRecordDetail',
    url: '/api/task/qryCallDtl',
    method: 'POST',
    name: '通话详情接口',
    params: [{
      ...commonParams.taskIds
    },
    {
      key: 'pageNum',
      value: 1,
      required: false,
      desr: '分页查询，第几页',
      type: 'Number'
    }, {
      key: 'showNum',
      value: 20,
      required: false,
      desr: '分页查询，一页多少条数据',
      type: 'Number'
    }
    ],
    auth: true
  },
  {
    key: 'getGlobalInfo',
    url: '/api/task/getGlobalInfo',
    method: 'POST',
    name: '企业待拨号码数量统计',
    auth: true
  },
  {
    key: 'startGlobalOutcallTask',
    url: '/api/task/startGlobalOutcallTask',
    method: 'POST',
    name: '启动企业下所有的任务',
    auth: true
  },
  {
    key: 'pauseGlobalOutcallTask',
    url: '/api/task/pauseGlobalOutcallTask',
    method: 'POST',
    name: '暂停企业下所有的任务',
    auth: true
  },
  {
    key: 'stopGlobalOutcallTask',
    url: '/api/task/stopGlobalOutcallTask',
    method: 'POST',
    name: '关闭企业下所有的任务',
    auth: true
  }
  ]
}
export default TaskQuery
