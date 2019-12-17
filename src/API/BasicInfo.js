const BasicInfo = {
  key: 'BasicInfo',
  name: '公司信息接口定义',
  children: [{
    key: 'getInfo',
    name: '获取公司信息接口',
    url: '/api/enterprise/getInfo',
    method: 'POST',
    auth: true
  },
  {
    key: 'getNumbers',
    name: '获取主叫号码接口',
    url: '/api/enterprise/getNumbers',
    method: 'POST',
    auth: true
  },
  {
    key: 'getScripts',
    name: '获取企业话术列表接口',
    url: '/api/enterprise/qryScript',
    method: 'POST',
    params: [
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
    key: 'getRecordUrl',
    name: '获取通话录音地址',
    url: '/api/enterprise/getRecordUrl',
    method: 'POST',
    auth: true,
    params: [{
      key: 'cc_number',
      value: '20017_00000010conf0_1532685751117',
      required: true,
      desr: '通话唯一标识(用于查询录音)'
    },
    {
      key: 'flag',
      value: 1,
      required: true,
      desr: '录音url类型 0：试听 1：下载',
      type: 'Number'
    }]
  }
  ]
}

export default BasicInfo
